import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import useSWR, { mutate } from "swr";
import { GoPlus } from "react-icons/go";
import dynamic from "next/dynamic";
const fetcher = (url) => instance.get(url).then((res) => res.data.data);
import { instance } from "../../../../utils/validation";
const NoSSREditor = dynamic(() => import("./addnotes"), { ssr: false });
export default function notes(props) {
  const url =
    appglobal.api.base_api + appglobal.api.get_notes + props.patientid;
  const { data, error } = useSWR(url, fetcher);
  console.log(data);
  console.log(error);

  const [notes, setNotes] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    setNotes(data);
  }, [data]);

  return (
    <>
      <Container className= {!showAdd ? "divNoteslist" : "d-none"}>
        <Row className="rowHeader">
          <Col lg={6}>
            <p className="pHeader">All NOTES</p>
          </Col>
          <Col lg={6}>
            <button className="btnAddnotes" onClick = {() => setShowAdd(true)}>
              <GoPlus />
            </button>
          </Col>
        </Row>
        <Row>
          <Col lg={12} className="colList">
            <Table responsive>
              <thead>
                <tr>
                  <th>Created Date</th>
                  <th>Title</th>
                  <th>Clinician</th>
                  <th>Edited Date</th>
                </tr>
              </thead>
              <tbody>
                {notes?.map((event) => (
                  <tr id={event.text} name={event.id} data-title={event.title}>
                    <td>
                      <p className="pDate">
                        {moment(event.created_at).format("ll")}
                      </p>
                      <p className="pDay">
                        {moment(event.created_at).format("LTS")}
                      </p>
                    </td>
                    <td>
                      <p className="pTitle">
                        {event.title ? event.title : "Untitled notes"}
                      </p>
                    </td>
                    <td>
                      <p className="pName">
                        {event.clinicians.first_name}{" "}
                        {event.clinicians.last_name}
                      </p>
                    </td>
                    <td>
                      <p className="pDate">
                        {moment(event.updated_at).format("ll")}
                      </p>
                      <p className="pDay">
                        {moment(event.updated_at).format("LTS")}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <Container className = {showAdd ? "" : "d-none"}>
         <NoSSREditor/>
      </Container>
    </>
  );
}
