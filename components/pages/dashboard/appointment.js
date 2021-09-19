import Header from "../../../components/header";
import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import useSWR, { mutate } from "swr";
import axios from "axios";
import moment from "moment";
import Cookies from "js-cookie";
import MessageService from "../../../services/api/api.message";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2, FiPlus } from "react-icons/fi";
import { GoSearch, GoPlus } from "react-icons/go";
import { searchTable, searchPota } from "../../../utils/dashboardSearch";
import { permission } from "../../../utils/validation";
import { useAppointmentStore } from "../../../store/store";
import Avatar from "@material-ui/core/Avatar";
import Modal from "react-bootstrap/Modal";
import Modaldelete from "../../../components/modal/deleteModal";
import ModalAppointment from "../../../components/pages/dashboard/modalAppointment";
import ModalInfo from "../../../components/modal/modalInfoEvent";
const fetcher = (url) =>
  MessageService.getEvents(Cookies.get("clinician_id")).then(
    (response) => response.data
  );
export default function appointment() {
  const setInfo = useAppointmentStore((state) => state.addInfo);
  const setAction = useAppointmentStore((state) => state.addAction);
  const { data, error } = useSWR("Appointment", fetcher);
  const [appointment, setAppointment] = useState([]);
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [info, setInfoEvent] = useState([]);
  const [showAppointment, setShowAppointment] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseAppointment = () => setShowAppointment(false);
  const handleShow = () => setShow(true);
  const handleShowAppointment = () => setShowAppointment(true);
  const handleShowEvent = () => setShowInfo(true);
  const handleCloseEvent = () => setShowInfo(false);
  useEffect(() => {
    setAppointment(data);
    console.log(data);
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
                    placeholder="Search events.."
                    onChange={(e) => {
                      searchPota(
                        Cookies.get("clinician_id"),
                        e.currentTarget.value
                      ).then((res) => setAppointment(res));
                    }}
                  />
                </div>
              </Col>
              <Col lg={8} className="align-self-center">
                <button
                  className="btnBlue float-right "
                  onClick={() => {
                    setAction("Add");
                    handleShowAppointment();
                  }}
                >
                  <i>
                    <GoPlus />
                  </i>
                  New Event
                </button>
              </Col>
            </Row>
            <div className="conTable">
              <Table responsive>
                <thead>
                  <tr>
                    <th>Start</th>
                    <th>End</th>
                    <th>Event Name</th>
                    <th>Event Type</th>
                    <th>Participants</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {appointment
                    ? appointment.map((event, i) => (
                        <tr
                          key={i}
                          onClick={() => {
                            setInfoEvent(event);
                            setShowInfo(true);
                          }}
                        >
                          <td>
                            <p className="pDate">
                              {moment(event.date_from).format("lll")}
                            </p>
                            <p className="pDay">
                              {moment(event.date_from).format("dddd")}
                            </p>
                          </td>
                          <td>
                            <p className="pDate">
                              {moment(event.date_to).format("lll")}
                            </p>
                            <p className="pDay">
                              {moment(event.date_to).format("dddd")}
                            </p>
                          </td>
                          <td>
                            <p className="pEtype">{event.subject}</p>
                          </td>
                          <td>
                            <p className={permission(event.event_type)}>
                              {event.event_type}
                            </p>
                          </td>
                          <td>
                            <div className="form-inline">
                              {(() => {
                                try {
                                  return (
                                    <>
                                      <div className="form-inline">
                                        {event.events_participants[0].clinicians
                                          .photo ? (
                                          <Avatar
                                            className="avatarImage"
                                            src={
                                              appglobal.api.aws +
                                              event.events_participants[0]
                                                .clinicians.photo
                                            }
                                          />
                                        ) : (
                                          <Avatar className="avatar">
                                            {event.events_participants[0].clinicians.first_name.charAt(
                                              0
                                            ) +
                                              event.events_participants[0].clinicians.last_name.charAt(
                                                0
                                              )}
                                          </Avatar>
                                        )}
                                        <div>
                                          <p>
                                            {event.events_participants[0]
                                              .clinicians.first_name +
                                              " " +
                                              event.events_participants[0]
                                                .clinicians.last_name}
                                          </p>
                                        </div>
                                      </div>
                                    </>
                                  );
                                } catch (error) {
                                  console.log(error)
                                }
                              })()}
                            </div>
                          </td>
                          <td>
                            <i
                              onClick={(e) => {
                                e.stopPropagation();
                                setInfo(event);
                                setAction("Edit");
                                handleShowAppointment();
                              }}
                            >
                              <FiEdit2 />
                            </i>
                            <i
                              onClick={(e) => {
                                e.stopPropagation();
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
          mutatedata={fetcher}
          type="event"
        />
      </Modal>
      <Modal
        show={showAppointment}
        onHide={handleCloseAppointment}
        centered
        className="modalNormal"
      >
        <ModalAppointment
          closeModal={handleCloseAppointment}
          id={id}
          mutatedata={fetcher}
        />
      </Modal>
      <Modal
        centered
        className="modalInfo"
        show={showInfo}
        onHide={handleCloseEvent}
      >
        <ModalInfo infoevent={info} />
      </Modal>
    </>
  );
}
