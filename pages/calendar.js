import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

export default function calendar() {
  const localizer = momentLocalizer(moment);
  const [myEventsList, setMyEventList] = useState([]);
  return (
    <Container fluid className = "conCalendar conPages">
      <Row>
        <Col lg={12}>
          <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </Col>
      </Row>
    </Container>
  );
}
