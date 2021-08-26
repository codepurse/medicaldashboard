import Header from "../../../components/header";
import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";
import moment from "moment";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDRhNWQ2YzcxZmMyMDM5MWIwNDE0NjdiMWZjNzQ0MWEwZGU4MjFkOTBiMjFiMjBjMDIxYzMxMTk2NThhZDc2YTQ2NzdjYzVmOWVlZjFmNzciLCJpYXQiOjE2Mjk4OTQ3MDIuNDk5Mjc2LCJuYmYiOjE2Mjk4OTQ3MDIuNDk5MjgsImV4cCI6MTY0NTc5NTkwMi4yNDUwODQsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.SDQLFckHuVN3GCKGglX1Xg-uhKOUT2k8b9ct33HhAP_n0oAoPa5kAsg0TXZBqa_lAhTRnXmJ4-CgOvLLF3hXTsj6T5pLFNyw1d0ptlBi28_7YoZcdvmYyPHUbz30dfTZG4gTS49RYywIY0qW4-slXgkAY-KrTXmhKZcVj1Aoji0HIlTKeQ2nwNBdeBIfpDtTpGe14yMGeqKTW0I5F0i94QeselFxz2E-_fTK9qgs2CDAh0xE6ucnCmAy7VRB9-MfUWUiS5SWbVdaYIrEODnvMWI7LRWhHwwzagj_s--o8wrQeeLwBjmLiVNSdidipjgpdPBQb6qJ3liLLcqkJQecV1v7Y3ulOikZsxYl7w8XRnrNwgd4Tgw_mPHkHNoTNO68j2Dq1MEBMLQvfZQznuDxJ7skkEVhXbsaAbFjTozz_x6Ql9HS9bXRBXQAORL7Z_t7SEnrFFZI8tN6zJSbekh4ov69_FWEgtPJgleBQ6t-KIQo8kzZWTqucyp-aJCnNMkXnhjHzviDBNSmzzZyEaF5dLpzEesqowUgatR6iWOHyX6rQcgiPIRALRPI1nSED6UCBuh0x-2g8eX_Dl6Z3VapehH8uvK0lOgtL_DomZBpazd5AetJvGK4wp_Xh1ldcPUVhOKPzdIUYeFBxrY7iNc3l1T9i9YUksT2zL5dauaVLvs";
const fetcher = (url) =>
  axios
    .get("https://staging.resurfacehub.com/api/auth/events?clinician_id=6", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);

export default function appointment() {
  const { data, error } = useSWR("location", fetcher);
  const [location, setLocation] = useState([]);
  if (error) {
    console.log(error);
  }
  console.log("location1", data);

  return (
    <>
      <Container fluid  className = "conAppointment p-0">
        <Row>
          <Col lg={12} className = "p-0">
            <div className="conTable">
              <Table>
                <thead>
                  <tr>
                    <th>Start</th>
                    <th>End</th>
                    <th>Event Name</th>
                    <th>Event Type</th>
                    <th>Participants</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data
                    ? data.data.map((event, i) => (
                        <tr key={i}>
                          <td>
                            <p className="pDate">
                              {moment(event.date_from).format("MMMM do, YYYY")}
                            </p>
                            <p className="pDay">
                              {moment(event.date_from).format("dddd")}
                            </p>
                          </td>
                          <td>
                            <p className="pDate">
                              {moment(event.date_to).format("MMMM do, YYYY")}
                            </p>
                            <p className="pDay">
                              {moment(event.date_to).format("dddd")}
                            </p>
                          </td>
                          <td>
                            <p className="pEtype">{event.subject}</p>
                          </td>
                          <td>
                            <p> {event.event_type}</p>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
