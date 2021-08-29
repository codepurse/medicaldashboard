import Header from "../components/header";
import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import {useSettingStore} from "../store/store";
import useSWR from "swr";
import Appointment from "../components/pages/dashboard/appointment";
import TimeEntry from "../components/pages/dashboard/timeEntry";

export default function dashboard() {
  const people = useSettingStore((state) => state.people);
  const [fullname, setFullname] = useState("");
  const [showAppointment, setShowAppointment] = useState(true);
  const [showTimeentry, setShowTimeentry] = useState(false);
  useEffect(() => {
    setFullname(people[0].user.full_name);
  }, []);
  return (
    <Container fluid className="conDashboard conPages">
      <Row>
        <Col lg={12}>
          <p className="pHeader">
            <span>Good Morning</span> {fullname}!
          </p>
          <p className="pHeadersub">This is what we've got for you today.</p>
          <ul className="ulDashboard">
            <li
              className={showAppointment ? "activeUl" : ""}
              id="ulAppointment"
              onClick={() => {
                setShowAppointment(true);
                setShowTimeentry(false);
              }}
            >
              Appointments
            </li>
            <li
              className={showTimeentry ? "activeUl" : ""}
              id="ulTime"
              onClick={() => {
                setShowAppointment(false);
                setShowTimeentry(true);
              }}
            >
              Time Entries
            </li>
          </ul>
        </Col>
        <Col lg={12} className={showAppointment ? "" : "d-none"}>
          <Appointment />
        </Col>
        <Col lg={12} className={showTimeentry ? "" : "d-none"}>
          <TimeEntry />
        </Col>
      </Row>
    </Container>
  );
}
