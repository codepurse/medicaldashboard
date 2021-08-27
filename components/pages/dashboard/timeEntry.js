import Header from "../../../components/header";
import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import useSWR from "swr";
import Cookies from "js-cookie";
import MessageService from "../../../services/api/api.message";



export default function appointment() {


  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={12}>
            <pre></pre>
          </Col>
        </Row>
      </Container>
    </>
  );
}
