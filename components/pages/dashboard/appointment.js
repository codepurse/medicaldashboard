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
import { FiEdit2 } from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import { searchTable, searchPota } from "../../../utils/dashboardSearch";
const fetcher = (url) =>
  MessageService.getEvents(Cookies.get("clinician_id")).then(
    (response) => response.data
  );
export default function appointment() {
  const ourRequest = axios.CancelToken.source();
  const { data, error } = useSWR("Appointment", fetcher);
  const [appointment, setAppointment] = useState([]);
  const [query, setQuery] = useState("");
  if (error) {
    console.log(error);
  }

  useEffect(() => {
    setAppointment(data);
  }, [data]);

  return (
    <>
      <Container fluid className="conAppointment p-0">
        <Row>
          <Col lg={12} className="p-3">
            <Row>
              <Col lg={4}>
                <br />
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i>
                        <GoSearch />
                      </i>
                      Search
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control txtInput"
                    placeholder="Type here.."
                    onChange={(e) => {
                      console.log(searchPota(6, e.currentTarget.value))
                    
                    }}
                  />
                </div>
              </Col>
            </Row>
            <div className="conTable">
              <Table>
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
                            <p className="pDate">
                              {moment(event.date_to).format("MMMM do, YYYY")}
                            </p>
                            <p className="pDay">
                              {moment(event.date_to).format("dddd")}
                            </p>
                          </td>
                          <td>
                            <p className="pEtype">{event.subject}</p>
                          </td>
                          <td>
                            <p> {event.event_type}</p>
                          </td>
                          <td>
                            <div className="form-inline">
                              {event.events_participants[0].clinicians !==
                                null &&
                              event.events_participants[0].clinicians.photo ? (
                                <img
                                  src={
                                    "https://resurface-s3.s3.ap-southeast-1.amazonaws.com/" +
                                    event.events_participants[0].clinicians
                                      .photo
                                  }
                                  className="imgProfile"
                                ></img>
                              ) : (
                                <p className="profileImage">
                                  {event.events_participants[0].clinicians !==
                                    null &&
                                    event.events_participants[0].clinicians.first_name.charAt(
                                      0
                                    )}{" "}
                                  {event.events_participants[0].clinicians !==
                                    null &&
                                    event.events_participants[0].clinicians.last_name.charAt(
                                      0
                                    )}
                                </p>
                              )}
                              <div>
                                <p className="pNamelist">
                                  {event.events_participants[0].clinicians !==
                                    null &&
                                    event.events_participants[0].clinicians
                                      .first_name}{" "}
                                  {event.events_participants[0].clinicians !==
                                    null &&
                                    event.events_participants[0].clinicians
                                      .last_name}
                                </p>
                                <p>
                                  {event.events_participants[0].clinicians !==
                                    null &&
                                    event.events_participants[0].clinicians
                                      .email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <i>
                              <FiEdit2 />
                            </i>
                            <i>
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
    </>
  );
}
