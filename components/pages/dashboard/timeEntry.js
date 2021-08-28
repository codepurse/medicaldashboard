import Header from "../../../components/header";
import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import useSWR from "swr";
import axios from "axios";
import moment from "moment";
import Cookies from "js-cookie";
import MessageService from "../../../services/api/api.message";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2, FiPlus } from "react-icons/fi";
import { GoSearch, GoPlus } from "react-icons/go";
import { searchTable, searchPota } from "../../../utils/dashboardSearch";
import Modal from "react-bootstrap/Modal";
import Modaldelete from "../../../components/modal/deleteModal";
const fetcher = (url) =>
  MessageService.getTime(Cookies.get("clinician_id")).then(
    (response) => response.data
  );
export default function appointment() {
  const { data, error } = useSWR("TimeEntry", fetcher);
  const [timeentry, setTimeentry] = useState([]);
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    console.log("Time" , data);
    setTimeentry(data);
  }, [data]);

  return (
    <>
      <Container fluid className="conAppointment p-0">
        <Row>
          <Col lg={12} className="p-3 ">
            <Row>
              <Col lg={4}>
                <br />
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i>
                        <GoSearch />
                      </i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control txtInput"
                    placeholder="Search time entry.."
                    onChange={(e) => {
                      searchPota(6, e.currentTarget.value).then((res) =>
                        setAppointment(res)
                      );
                    }}
                  />
                </div>
              </Col>
              <Col lg={8} className="align-self-center">
                <button className="btnBlue float-right ">
                  <i>
                    <GoPlus />
                  </i>
                  New Time Entry
                </button>
              </Col>
            </Row>
            <div className="conTable">
         
            </div>
          </Col>
        </Row>
      </Container>
      <Modal
        show={show}
        onHide={handleClose}
        size="sm"
        centered
        className="modalDelete"
      >
        <Modaldelete closeModal={handleClose} id={id} mutatedata={fetcher} />
      </Modal>
    </>
  );
}
