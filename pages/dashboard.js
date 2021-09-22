import React, { Component, useState, useEffect, useRef } from "react";
import Appointment from "../components/pages/dashboard/appointment";
import TimeEntry from "../components/pages/dashboard/timeEntry";
import { Container, Row, Col } from "react-bootstrap";
import { useSettingStore } from "../store/store";
import Header from "../components/header";
import { useRouter } from "next/router";
import useSWR from "swr";



export default function dashboard() {
  const people = useSettingStore((state) => state.people);
  const [fullname, setFullname] = useState("");
  const [showAppointment, setShowAppointment] = useState(true);
  const [showTimeentry, setShowTimeentry] = useState(false);
  const date = new Date();
  let hours = date.getHours();
  let status =
    hours < 12 ? "Morning" : hours <= 18 && hours >= 12 ? "Afternoon" : "Evening";
  useEffect(() => {
    setFullname(people[0].user.full_name);
  }, []);
  return (
    <Container fluid className="conDashboard conPages">
      <Row>
        <Col lg={12}>
          <p className="pHeader">
            <span>Good {status}</span> {fullname}!
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
