import React, {
  Component,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { GoPlus } from "react-icons/go";
import { GrView } from "react-icons/gr";
import { FiDownload } from "react-icons/fi";
import moment from "moment";
import { instance } from "../../../../utils/validation";
import { filetype } from "../../../../utils/global";
import { HiPhotograph } from "react-icons/hi";
import useSWR, { mutate } from "swr";
const fetcher = (url) => instance.get(url).then((res) => res.data.data);
function form(props) {
  const url =
    appglobal.api.base_api + appglobal.api.get_all_document + props.patientid;
  const { data, error } = useSWR(url, fetcher);
  console.log(data);
  console.log(error);

  const [attachments, setAttachments] = useState([]);
  useEffect(() => {
    setAttachments(data);
  }, [data]);

  return (
    <>
      <Container fluid className="divNoteslist">
        <Row className="rowHeader">
          <Col lg={6}>
            <p className="pHeader">DOCUMENTS</p>
          </Col>
          <Col lg={6}>
            <button className="btnAddnotes">
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
                      <i>
                        <GrView />
                      </i>
                      <i>
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
    </>
  );
}

export default form;
