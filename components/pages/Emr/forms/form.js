import MessageService from "../../../../services/api/api.message";
import { instance } from "../../../../utils/validation";
import { useSnackStore } from "../../../../store/store";
import { Container, Row, Col } from "react-bootstrap";
import { filetype } from "../../../../utils/global";
import { HiPhotograph } from "react-icons/hi";
import { FiDownload } from "react-icons/fi";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { GoPlus } from "react-icons/go";
import { GrView } from "react-icons/gr";
import Modalupload from "./modalUpload";
import useSWR, { mutate } from "swr";
import moment from "moment";
import axios from "axios";
import React, {
  Component,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
const fetcher = (url) => instance.get(url).then((res) => res.data.data);
function form(props) {
  const url =
    appglobal.api.base_api + appglobal.api.get_all_document + props.patientid;
  const { data, error } = useSWR(url, fetcher);
  console.log(data);
  console.log(error);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const setSnack = useSnackStore((state) => state.changeState);
  const setSnackMessage = useSnackStore((state) => state.changeMessage);
  const setSnackStyle = useSnackStore((state) => state.changeStyle);
  useEffect(() => {
    setAttachments(data);
  }, [data]);
  const viewFile = (e) => {
    const file = appglobal.api.aws + e.path;
    window.open(file, "_blank");
  };

  function saveFile(e) {
    try {
      window.open(
        appglobal.api.base_api + appglobal.api.download_files + e.path
      );
    } catch (error) {
      console.log(error);
      setSnackMessage("Sorry something went wrong.");
      setSnack(true);
      setSnackStyle(false);
    }
  }

  return (
    <>
      <Container fluid className="divNoteslist">
        <Row className="rowHeader">
          <Col lg={6}>
            <p className="pHeader">DOCUMENTS</p>
          </Col>
          <Col lg={6}>
            <button className="btnAddnotes" onClick={handleShow}>
              <GoPlus />
            </button>
          </Col>
        </Row>
        <Row>
          <Col lg={12} className="colList">
            <Table className="tableDocuments" responsive>
              <thead>
                <tr>
                  <th>Upload Date</th>
                  <th>File</th>
                  <th>Clinician</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {attachments?.map((event) => (
                  <tr>
                    <td>
                      <div className="form-inline">
                        <img
                          src={filetype(event.type)}
                          style={{ marginRight: "10px" }}
                        />
                        <p style={{ marginTop: "5px" }}>{event.filename}</p>
                      </div>
                    </td>
                    <td>
                      <p className="pDate">
                        {moment(event.created_at).format("ll")}
                      </p>
                      <p className="pDay">
                        {moment(event.created_at).format("LTS")}
                      </p>
                    </td>
                    <td>
                      <p className="pName">
                        {event.clinicians.first_name}{" "}
                        {event.clinicians.last_name}
                      </p>
                    </td>
                    <td>
                      <i
                        onClick={() => {
                          viewFile(event);
                        }}
                      >
                        <GrView />
                      </i>
                      <i onClick={() => saveFile(event)}>
                        <FiDownload />
                      </i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Modal className="conModal" show={show} onHide={handleClose} centered>
        <Modalupload
          id={props.patientid}
          onHide={handleClose}
          mutateUrl={url}
        />
      </Modal>
    </>
  );
}

export default form;
