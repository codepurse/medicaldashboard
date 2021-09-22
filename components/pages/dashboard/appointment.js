import ModalAppointment from "../../../components/pages/dashboard/modalAppointment";
import { searchTable, searchPota } from "../../../utils/dashboardSearch";
import React, { Component, useState, useEffect, useRef } from "react";
import ModalInfo from "../../../components/modal/modalInfoEvent";
import Modaldelete from "../../../components/modal/deleteModal";
import MessageService from "../../../services/api/api.message";
import { useAppointmentStore } from "../../../store/store";
import { permission } from "../../../utils/validation";
import { Container, Row, Col } from "react-bootstrap";
import { GoSearch, GoPlus } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2, FiPlus } from "react-icons/fi";
import Header from "../../../components/header";
import Avatar from "@material-ui/core/Avatar";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import Cookies from "js-cookie";
import moment from "moment";
import axios from "axios";

const fetcher = (url) =>
  MessageService.getEvents(Cookies.get("clinician_id")).then(
    (response) => response.data
  );
export default function appointment() {
  const router = useRouter();
  const setInfo = useAppointmentStore((state) => state.addInfo);
  const setAction = useAppointmentStore((state) => state.addAction);
  const [search, setSearch] = useState(null);
  const { data, error } = useSWR(!search ? "Appointment" : null, fetcher, {
    refreshInterval: 1000,
  });
  console.log(error);
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
          <Col lg={12} className="p-3">
            <Row className={router.pathname !== "/dashboard" ? "d-none" : ""}>
              <Col lg={4} md={9} sm={8} xs={10}>
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
                      setSearch(e.currentTarget.value);
                      searchPota(
                        Cookies.get("clinician_id"),
                        e.currentTarget.value
                      ).then((res) => setAppointment(res));
                    }}
                  />
                </div>
              </Col>
              <Col lg={8} md={3} sm={4} xs={2} className="align-self-center">
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
                  <span> New Event</span>
                </button>
              </Col>
            </Row>
            <div className="conTable" id="no-more-tables">
              <Table className="table-condensed cf">
                <thead class="cf">
                  <tr>
                    <th>Start</th>
                    <th>End</th>
                    <th>Event Name</th>
                    <th>Event Type</th>
                    <th>Participants</th>
                    <th
                      className={
                        router.pathname !== "/dashboard" ? "d-none" : ""
                      }
                    ></th>
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
                          <td data-title="Start">
                            <p className="pDate">
                              {moment(event.date_from).format("lll")}
                            </p>
                            <p className="pDay">
                              {moment(event.date_from).format("dddd")}
                            </p>
                          </td>
                          <td data-title="End">
                            <p className="pDate">
                              {moment(event.date_to).format("lll")}
                            </p>
                            <p className="pDay">
                              {moment(event.date_to).format("dddd")}
                            </p>
                          </td>
                          <td data-title="Event Name">
                            <p className="pEtype">{event.subject}</p>
                          </td>
                          <td data-title="Event Type">
                            <p className={permission(event.event_type)}>
                              {event.event_type}
                            </p>
                          </td>
                          <td data-title="Participants">
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
                                  console.log(error);
                                }
                              })()}
                            </div>
                          </td>
                          <td
                            className={
                              router.pathname !== "/dashboard" ? "d-none" : ""
                            }
                          >
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
