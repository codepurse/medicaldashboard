import { searchTable, searchPota } from "../../../utils/dashboardSearch";
import React, { Component, useState, useEffect, useRef } from "react";
import ModalTime from "../../../components/pages/dashboard/Timemodal";
import Modaldelete from "../../../components/modal/deleteModal";
import { converter, timeType } from "../../../utils/validation";
import MessageService from "../../../services/api/api.message";
import { Container, Row, Col } from "react-bootstrap";
import { useTimeStore } from "../../../store/store";
import { GoSearch, GoPlus } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2, FiPlus } from "react-icons/fi";
import Header from "../../../components/header";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie";
import moment from "moment";
import axios from "axios";
import useSWR from "swr";

const fetcher = (url) =>
  MessageService.getTime(Cookies.get("clinician_id")).then(
    (response) => response.data
  );
export default function appointment() {
  const setInfo = useTimeStore((state) => state.addInfo);
  const setAction = useTimeStore((state) => state.addAction);
  const { data, error } = useSWR("TimeEntry", fetcher);
  const [timeentry, setTimeentry] = useState([]);
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showTime, setShowTime] = useState(false);
  const handleCloseTime = () => setShowTime(false);
  const handleShowTime = () => setShowTime(true);

  useEffect(() => {
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
                        setTimeentry(res)
                      );
                    }}
                  />
                </div>
              </Col>
              <Col lg={8} className="align-self-center">
                <button
                  className="btnBlue float-right "
                  onClick={() => {
                    handleShowTime();
                  }}
                >
                  <i>
                    <GoPlus />
                  </i>
                  New Time Entry
                </button>
              </Col>
            </Row>
            <div className="conTable">
              <Table responsive>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Clients</th>
                    <th>Activity Type</th>
                    <th>Duration</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {timeentry
                    ? timeentry.map((event, i) => (
                        <tr key={i}>
                          <td>
                            <p className="pDate">
                              {moment(event.date_from).format("MMMM do, YYYY")}
                            </p>
                            <p className="pDay">
                              {moment(event.date_from).format("dddd")}
                            </p>
                          </td>
                          <td>
                            <p>
                              {event.clients.first_name}{" "}
                              {event.clients.last_name}
                            </p>
                          </td>
                          <td>
                            <p className={timeType(event.activity_type)}>
                              {event.activity_type}
                            </p>
                          </td>
                          <td>
                            <p>{converter(event.date_from, event.date_to)}</p>
                          </td>
                          <td>
                            <i
                              onClick={() => {
                                setInfo(event);
                                setAction("Edit");
                                handleShowTime();
                              }}
                            >
                              <FiEdit2 />
                            </i>
                            <i
                              onClick={() => {
                                handleShow();
                                setId(event.id);
                              }}
                            >
                              <AiOutlineDelete />
                            </i>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </Table>
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
        <Modaldelete
          closeModal={handleClose}
          id={id}
          type="time entry"
          mutatedata={fetcher}
        />
      </Modal>
      <Modal
        show={showTime}
        onHide={handleCloseTime}
        centered
        className="modalNormal"
      >
        <ModalTime closeModal={handleCloseTime} />
      </Modal>
    </>
  );
}
