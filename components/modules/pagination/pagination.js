import React, { Component, useState, useEffect, useRef } from "react";
import MessageService from "../../../services/api/api.message";
import appglobal from "../../../services/api/api.services";
import { Container, Row, Col } from "react-bootstrap";
import Pagination from "@material-ui/lab/Pagination";
import Header from "../../../components/header";
import Avatar from "@material-ui/core/Avatar";
import { useRouter } from "next/router";
import useSWR ,{ mutate } from "swr";
import Cookies from "js-cookie";
import axios from "axios";


export default function pagination(props) {
  const [page,setPage] = useState(1);

  const handleChange = (event, value) => {
      props.page(value)
      setPage(value)
  };

  return (
    <Container fluid className="conPagination">
      <Row>
        <Col lg={6}></Col>
        <Col lg={6}>    
          <div className="float-right">
            <Pagination
              count={props.count}
              showFirstButton
              showLastButton
              page = {page}
              onChange={handleChange}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
