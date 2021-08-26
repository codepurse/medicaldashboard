import Header from "../../../components/header";
import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = async () => {
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDRhNWQ2YzcxZmMyMDM5MWIwNDE0NjdiMWZjNzQ0MWEwZGU4MjFkOTBiMjFiMjBjMDIxYzMxMTk2NThhZDc2YTQ2NzdjYzVmOWVlZjFmNzciLCJpYXQiOjE2Mjk4OTQ3MDIuNDk5Mjc2LCJuYmYiOjE2Mjk4OTQ3MDIuNDk5MjgsImV4cCI6MTY0NTc5NTkwMi4yNDUwODQsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.SDQLFckHuVN3GCKGglX1Xg-uhKOUT2k8b9ct33HhAP_n0oAoPa5kAsg0TXZBqa_lAhTRnXmJ4-CgOvLLF3hXTsj6T5pLFNyw1d0ptlBi28_7YoZcdvmYyPHUbz30dfTZG4gTS49RYywIY0qW4-slXgkAY-KrTXmhKZcVj1Aoji0HIlTKeQ2nwNBdeBIfpDtTpGe14yMGeqKTW0I5F0i94QeselFxz2E-_fTK9qgs2CDAh0xE6ucnCmAy7VRB9-MfUWUiS5SWbVdaYIrEODnvMWI7LRWhHwwzagj_s--o8wrQeeLwBjmLiVNSdidipjgpdPBQb6qJ3liLLcqkJQecV1v7Y3ulOikZsxYl7w8XRnrNwgd4Tgw_mPHkHNoTNO68j2Dq1MEBMLQvfZQznuDxJ7skkEVhXbsaAbFjTozz_x6Ql9HS9bXRBXQAORL7Z_t7SEnrFFZI8tN6zJSbekh4ov69_FWEgtPJgleBQ6t-KIQo8kzZWTqucyp-aJCnNMkXnhjHzviDBNSmzzZyEaF5dLpzEesqowUgatR6iWOHyX6rQcgiPIRALRPI1nSED6UCBuh0x-2g8eX_Dl6Z3VapehH8uvK0lOgtL_DomZBpazd5AetJvGK4wp_Xh1ldcPUVhOKPzdIUYeFBxrY7iNc3l1T9i9YUksT2zL5dauaVLvs";
  const defaultOptions = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await fetch(
    "https://staging.resurfacehub.com/api/auth/events?clinician_id=6",
    defaultOptions
  );
  const data = await response.json();
  return data;
};

export default function appointment() {
  const { data, error } = useSWR("timeentry", fetcher);
  console.log("Time entry", data);

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={12}>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </Col>
        </Row>
      </Container>
    </>
  );
}
