import Header from "../components/header";
import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import MessageService from "../services/api/api.message";

export default function emr() {
  return (
    <Container fluid className="h-100 conDashboard">
      <Row className="h-100 align-items-center">
        <Col lg={12}>
          <p style={{ textAlign: "center" }}>EMR</p>
        </Col>
      </Row>
    </Container>
  );
}
