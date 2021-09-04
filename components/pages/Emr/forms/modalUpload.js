import React, { useState, useEffect, useCallback, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FaCloudUploadAlt } from "react-icons/fa";
import MessageService from "../../../../services/api/api.message";
import { useSnackStore } from "../../../../store/store";
import useSWR, { mutate } from "swr";
import Cookies from "js-cookie";

export default function modalUpload(props) {
  const setSnack = useSnackStore((state) => state.changeState);
  const setSnackMessage = useSnackStore((state) => state.changeMessage);
  const setSnackStyle = useSnackStore((state) => state.changeStyle);
  const inputFileRef = useRef(null);
  const [filename, setFile] = useState("");
  const [type, setType] = useState("");
  const [path, setPath] = useState("");
  const onBtnClick = () => {
    inputFileRef.current.click();
  };
  function handleFile(e) {
    var reader = new FileReader();
    let file = e.target.files[0];
    let size = (file.size / 1024 / 1024).toFixed(2);
    reader.readAsDataURL(file);
    var filename = file.name;
    var ext = filename.substring(filename.lastIndexOf(".") + 1);
    setFile(file.name);
    setType(ext);
    setPath(file);
  }
  function changeFile(e) {
    setFile(e.currentTarget.value);
  }

  function goUpload() {
    if (!path) {
      setSnackMessage("Please choose a file.");
      setSnack(true);
      setSnackStyle(false);
    } else if (!filename) {
      setSnackMessage("File name is required.");
      setSnack(true);
      setSnackStyle(false);
    } else {
      let formData = new FormData();
      formData.append("clinician_id", Cookies.get("clinician_id"));
      formData.append("client_id", props.id);
      formData.append("path", path);
      formData.append("type", type);
      formData.append("filename", filename);
      MessageService.uploadFile(formData)
        .then((response) => {
          props.onHide();
          setSnackMessage("File successfully uoloaded.");
          setSnack(true);
          setSnackStyle(true);
          mutate(props.mutateUrl);
        })
        .catch((error) => {
          setSnackMessage("Sorry something went wrong.");
          setSnack(true);
          setSnackStyle(false);
          props.onHide();
        });
    }
  }

  return (
    <Container className="conModal">
      <input
        onChange={(e) => handleFile(e)}
        ref={inputFileRef}
        id="file-upload"
        type="file"
        className="d-none"
      />
      <Row>
        <Col lg={9} md={9}>
          <p className="pTitleInput">File Name</p>
          <input
            type="text"
            className="txtInput"
            onChange={changeFile}
            value={filename}
          />
        </Col>
        <Col lg={3} md={3} className="d-flex align-items-end">
          <button className="btnUploadFile" onClick={goUpload}>
            Upload
          </button>
        </Col>
        <Col lg={12}>
          <div className="divUpload" onClick={onBtnClick}>
            <div>
              <p>
                <i>
                  <FaCloudUploadAlt />
                </i>
              </p>
              <p>Click here to choose a file.</p>
            </div>
          </div>
        </Col>

        <Col lg={6}>
          <p className="pHeadersub" style={{ marginTop: "10px" }}>
            File type: PDF,JPG,PNG and TXT.
          </p>
        </Col>
        <Col lg={6} md={6}>
          <p
            className="pHeadersub"
            style={{ marginTop: "10px", textAlign: "right" }}
          >
            Maximum size: 15MB
          </p>
        </Col>
      </Row>
    </Container>
  );
}
