import React, { useState } from "react";
import AWS from "aws-sdk";
import { Row, Col, Button, Input, Alert } from "reactstrap";
// import Secret from "./secret/Secret";

function S3Upload(props) {
  const [progress, setProgress] = useState(0); //업로드 진행률
  const [selectedFile, setSelectedFile] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
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
    console.log(e.target.files); //선택한 파일들
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
      setSelectedFile([...selectedFile, file]);
      console.log(file);
      console.log(selectedFile);
    }
  };

  const uploadFile = (file) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: "sns/" + file.name,
      ContentType: file.type,
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
              <Alert color="primary">파일을 선택해 주세요.</Alert>
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
