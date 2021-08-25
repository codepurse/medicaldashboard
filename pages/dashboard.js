import Header from "../components/header";
import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import MessageService from "../services/api/api.message";
import useStore from "../store/store";
export default function dashboard() {
  const people = useStore((state) => state.people);
  const [fullname, setFullname] = useState("");

  useEffect(() => {
   setFullname(people[0].user.full_name)
  }, [])
  return (
    <Container fluid className="h-100 conDashboard">
      <Row className="h-100 align-items-center">
        <Col lg={12}>
          <p style={{ textAlign: "center" }}>Welcome {fullname}</p>
        </Col>
      </Row>
    </Container>
  );
}
