import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Search from "../components/modules/search/search";

export default function location() {
  const [showLocation, setShowlocation] = useState(true);
  const [showBuss, setShowBuss] = useState(false);
  return (
    <>
      <Container fluid className="conPages">
        <Row>
          <Col lg={12} style = {{marginBottom: "20px"}}>
            <ul className="ulDashboard">
              <li
                className={showLocation ? "activeUl" : ""}
                id="ulAppointment"
                onClick={() => {
                  setShowlocation(true);
                  setShowBuss(false);
                }}
              >
                Location
              </li>
              <li
                className={showBuss ? "activeUl" : ""}
                id="ulTime"
                onClick={() => {
                  setShow(false);
                  setShowBuss(true);
                }}
              >
                Business
              </li>
            </ul>
          </Col>
          <Search />
        </Row>
      </Container>
    </>
  );
}
