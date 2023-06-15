import React from "react";
import AWS from "aws-sdk";
import { Row, Col, Button, Input, Alert } from "reactstrap";
import { useRecoilState } from "recoil";
import { filesAtom, progressAtom, showAlertAtom } from "recoil/RegisterSnsAtom";

function S3Upload(props) {
  const [progress, setProgress] = useRecoilState(progressAtom); //업로드 진행률
  const [selectedFile, setSelectedFile] = useRecoilState(filesAtom);
  const [showAlert, setShowAlert] = useRecoilState(showAlertAtom);
  
  const ACCESS_KEY = "AKIA2FRRYIXGMZUAI6VM"; //iam에 있음
  const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;
  const REGION = "ap-northeast-2";
  const S3_BUCKET = "trip-recorder"; //s3버킷 네임

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
        (file.type !== "image/jpeg" || fileExt !== "jpg") &
        (file.type !== "image/png" || fileExt !== "png")
      ) {
        alert("jpg와 png파일만 Upload 가능합니다.");
        return;
      }
      setProgress(0);
      setSelectedFile(e.target.files);
      //   console.log(file);
      //   console.log(selectedFile);
    }
  };

  const uploadFile = (files) => {
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      const params = {
        ACL: "public-read",
        Body: files[i],
        Bucket: S3_BUCKET,
        Key: "sns/" + files[i].name, //"sns/유저id/tripid/snsid" 수정
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

  return (
    <div className="App">
      <div className="App-header">
        <Row>
          <Col></Col>
        </Row>
      </div>
      <div className="App-body">
        <Row>
          <Col>
            {showAlert ? (
              <Alert color="primary">업로드 진행률 : {progress}%</Alert>
            ) : (
              <Alert color="primary"></Alert>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              color="primary"
              type="file"
              multiple
              onChange={handleFileInput}
            />

            {selectedFile ? (
              <Button color="primary" onClick={() => uploadFile(selectedFile)}>
                {" "}
                Upload to S3
              </Button>
            ) : null}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default S3Upload;
