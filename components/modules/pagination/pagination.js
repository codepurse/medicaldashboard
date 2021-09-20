import React, { Component, useState, useEffect, useRef } from "react";
import MessageService from "../../../services/api/api.message";
import appglobal from "../../../services/api/api.services";
import { Container, Row, Col } from "react-bootstrap";
import Pagination from "@material-ui/lab/Pagination";
import Header from "../../../components/header";
import Avatar from "@material-ui/core/Avatar";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import Cookies from "js-cookie";
import axios from "axios";

export default function pagination(props) {
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    props.page(value);
    setPage(value);
  };

  return (
    <Container fluid className="conPagination">
      <Row>
        <Col lg={4}></Col>
        <Col lg={8} md={12} xs={12} sm={12}>
          <div className="divPagination" style={{ position: "relative" }}>
            <div>
              <Pagination
                count={props.count}
                page={page}
                siblingCount={0}
                onChange={handleChange}
                variant="outlined"
                shape="rounded"
              />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
