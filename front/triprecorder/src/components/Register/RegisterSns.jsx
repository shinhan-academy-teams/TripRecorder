import React, { useEffect, useRef } from "react";
import AWS from "aws-sdk";
import { Row, Col, Alert } from "reactstrap";
import { useRecoilState } from "recoil";
import {
  editInputIndexAtom,
  editInputValueAtom,
  filesAtom,
  inputValueAtom,
  inputVisibleAtom,
  openRangeAtom,
  progressAtom,
  showAlertAtom,
  tagsAtom,
  tripReceiptAtom,
} from "recoil/RegisterSnsAtom";
import "style/register.scss";
import logo from "assets/tripRecorder.png";
import {
  Button,
  Form,
  Input,
  Radio,
  Select,
  Space,
  Tag,
  Tooltip,
  theme,
} from "antd";
import authService from "api/auth.service";
import { PlusOutlined } from "@ant-design/icons";
import api from "api/axios";
import { tripNoState } from "../../recoil/Profile";

const { Option } = Select;

const RegisterSns = () => {
  const { TextArea } = Input;
  //사진 업로드
  const [progress, setProgress] = useRecoilState(progressAtom); //업로드 진행률
  const [selectedFile, setSelectedFile] = useRecoilState(filesAtom);
  const [showAlert, setShowAlert] = useRecoilState(showAlertAtom);
  const [tno, setTno] = useRecoilState(tripNoState);
  //해시태그

  //s3
  const ACCESS_KEY = "AKIA2FRRYIXGMZUAI6VM"; //iam에 있음
  const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;
  const REGION = "ap-northeast-2";
  const S3_BUCKET = "trip-recorder"; //s3버킷 네임

  //공개범위
  const [openRange, setOpenRange] = useRecoilState(openRangeAtom);

  //해시태그
  const { token } = theme.useToken();
  const [tags, setTags] = useRecoilState(tagsAtom);
  const [inputVisible, setInputVisible] = useRecoilState(inputVisibleAtom);
  const [inputValue, setInputValue] = useRecoilState(inputValueAtom);
  const [editInputIndex, setEditInputIndex] =
    useRecoilState(editInputIndexAtom);
  const [editInputValue, setEditInputValue] =
    useRecoilState(editInputValueAtom);

  const [tripReceipt, setTripReceipt] = useRecoilState(tripReceiptAtom); //게시글

  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  // useEffect(() => {
  //   console.log(tags);
  // }, [tags]);

  useEffect(() => {
    api
      .post("/exp/list/" + tno) //하드 코딩한 tripNo 수정 필요
      .then((res) => {
        const receiptData = res.data;
        setTripReceipt(receiptData.map((receipt) => receipt));
        console.log(receiptData);
      })
      .catch((err) => console.log("error : ", err));
  }, []);

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    // console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue("");
  };

  const handleReset = () => {
    setTags([]);
  };

  const tagInputStyle = {
    width: 78,
    verticalAlign: "top",
  };
  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const handleFileInput = (e) => {
    // console.log(e.target.files); //선택한 파일들
    for (let i = 0; i < e.target.files.length; i++) {
      //파일 갯수만큼 for
      //console.log(e.target.files[i].name); //파일명...
      const file = e.target.files[i];
      const fileExt = file.name.split(".").pop();
      if (
        (file.type !== "image/jpeg" || fileExt !== "jpeg") &
        (file.type !== "image/png" || fileExt !== "png") &
        (file.type !== "image/jpg" || fileExt !== "jpg")
      ) {
        alert("jpg, jpeg, png파일만 업로드 가능합니다.");
        return;
      }
      setProgress(0);
      setSelectedFile(e.target.files);
      //   console.log(file);
      //   console.log(selectedFile);
    }
  };

  useEffect(() => {
    console.log(selectedFile);
  }, [selectedFile]);

  var fileString = "";
  // const [fileStr, setFileStr] = useRecoilState()
  for (var i = 0; i < selectedFile.length; i++) {
    console.log("사진 이름", selectedFile[i].name);

    fileString += "sns/" + tno + "/" + selectedFile[i].name + "@";
  }
  console.log("String : ", fileString);

  const uploadFile = (files) => {
    console.log("사진파일 :", files[0].name);

    for (let i = 0; i < files.length; i++) {
      const params = {
        ACL: "public-read",
        Body: files[i],
        Bucket: S3_BUCKET,
        Key: "sns/" + tno + "/" + files[i].name, //"sns/유저id/tripid/snsid" 수정
        ContentType: files[i].type,
      };
      myBucket
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          setProgress(Math.round((evt.loaded / evt.total) * 100));
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            setSelectedFile([]);
          }, 3000);
        })
        .send((err) => {
          if (err) console.log(err);
        });
    }
  };

  const onFinish = (values) => {
    //values : DB에 저장할 입력값
    console.log("Success:", values);
    // console.log();
    authService
      .RegisterSns(
        tno,
        values["receipt"],
        tags,
        values["snsTitle"],
        values["snsContent"],
        fileString,
        values["snsScope"]
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleCardChange = (value) => {
    console.log(value);
  };
  return (
    <div className="divbox">
      <img alt="tripRecorder" src={logo} className="logoimg" />
      <small style={{ color: "#9CA3AF", paddingBottom: 10 }}>
        여행 게시글 내용을 등록하세요.
      </small>
      {/* <Button
        size="small"
        onClick={() => {
          console.log(tno);
        }}
      >
        tripNo 확인
      </Button> */}
      <div className="divform">
        <Form
          name="basic"
          style={{
            maxWidth: 450,
            margin: "0 auto",
          }}
          onFinish={onFinish}
        >
          <Form.Item
            label="영수증 선택"
            name="receipt"
            rules={[
              {
                required: true,
                message: "경비 연결할 sns 게시글을 선택해주세요!",
              },
            ]}
          >
            <Select style={{ width: "350px" }} onChange={handleCardChange}>
              <Option value="null">선택 안함</Option>
              {tripReceipt.map((receipt, index) => {
                return (
                  <Option value={receipt.expNo} key={index}>
                    {receipt.expTitle}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          {/* 제목 */}
          <Form.Item
            label="제목"
            name="snsTitle"
            rules={[
              {
                required: true,
                message: "게시물 제목을 입력해주세요!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* 메모 */}
          <Form.Item label="메모" name="snsContent">
            <TextArea rows={3} />
          </Form.Item>

          {/* 사진 등록 */}
          <Row>
            <Col>
              {showAlert ? (
                <Alert color="primary">업로드 진행률 : {progress}%</Alert>
              ) : (
                <Alert color="primary"></Alert>
              )}
            </Col>
          </Row>
          <Form.Item
            label="사진"
            name="snsPhoto"
            rules={[
              {
                required: true,
                message: "게시물 사진을 업로드하세요!",
              },
            ]}
          >
            <Row>
              <Col>
                <Input
                  color="primary"
                  type="file"
                  multiple
                  onChange={handleFileInput}
                  // onBlur={() => uploadFile(selectedFile)}
                />
              </Col>
            </Row>
          </Form.Item>
          <br />
          <br />

          {/* 해시태그 */}
          <Space size={[0, 8]} wrap>
            <Space size={[0, 8]} wrap>
              {tags.map((tag, index) => {
                if (editInputIndex === index) {
                  return (
                    <Input
                      ref={editInputRef}
                      key={tag}
                      size="default"
                      style={tagInputStyle}
                      value={editInputValue}
                      onChange={handleEditInputChange}
                      onBlur={handleEditInputConfirm}
                      onPressEnter={handleEditInputConfirm}
                    />
                  );
                }
                const isLongTag = tag.length > 20;
                const tagElem = (
                  <Tag
                    key={tag}
                    closable={index !== 0}
                    style={{
                      userSelect: "none",
                    }}
                    onClose={() => handleClose(tag)}
                  >
                    <span
                      onDoubleClick={(e) => {
                        if (index !== 0) {
                          setEditInputIndex(index);
                          setEditInputValue(tag);
                          e.preventDefault();
                        }
                      }}
                    >
                      {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                    </span>
                  </Tag>
                );
                return isLongTag ? (
                  <Tooltip title={tag} key={tag}>
                    {tagElem}
                  </Tooltip>
                ) : (
                  tagElem
                );
              })}
            </Space>
            {inputVisible ? (
              <Input
                ref={inputRef}
                type="text"
                size="default"
                style={tagInputStyle}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
            ) : (
              <Tag style={tagPlusStyle} onClick={showInput}>
                <PlusOutlined /> New Tag
              </Tag>
            )}
          </Space>
          <br />
          <br />

          {/* 공개 범위 */}
          <Form.Item
            label="공개 범위"
            name="snsScope"
            rules={[
              {
                required: true,
                message: "공개범위를 설정해주세요!",
              },
            ]}
          >
            <Radio.Group onChange={setOpenRange} value={openRange}>
              <Space direction="horizontal" style={{ margin: 5 }}>
                <Radio value={1} onClick={() => setOpenRange(-1)}>
                  전체 공개
                </Radio>
                <Radio value={0} onClick={() => setOpenRange(0)}>
                  팔로워 공개
                </Radio>
                <Radio value={-1} onClick={() => setOpenRange(1)}>
                  비공개
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          {/* 버튼 */}
          <Button
            type="dashed"
            htmlType="submit"
            style={{ margin: "5px 5px" }}
            onClick={() => uploadFile(selectedFile)}
          >
            게시글 등록
          </Button>
          <Button
            type="dashed"
            htmlType="reset"
            style={{ margin: "5px 5px" }}
            onClick={handleReset}
          >
            게시글 리셋
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default RegisterSns;
