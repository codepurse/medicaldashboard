import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { instance, clinicianType, statusType } from "../../../utils/validation";
import appglobal from "../../../services/api/api.services";

export default function viewClinician(props) {
  useEffect(() => {
    console.log(props.info);
  }, []);
  return (
    <Container className="conModal conViewClinician">
      <Row>
        <Col lg={12}>
          <div className="form-inline">
            <img
              src={
                props.info.photo
                  ? appglobal.api.aws + props.info.photo
                  : "Image/userprofile.png"
              }
              className="imgProfile img-fluid"
            ></img>
            <div>
              <p className="pFullname">
                {props.info.first_name} {props.info.last_name}
              </p>
              <p className="pEmail">{props.info.user.email}</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: "15px" }}>
        <Col lg={12}>
          <p className="pTitle">Personal Information</p>
          <hr></hr>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">First Name</p>
          <p className="pInfo">{props.info.first_name}</p>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Middle Name</p>
          <p className="pInfo">{props.info.middle_name}</p>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Last Name</p>
          <p className="pInfo">{props.info.last_name}</p>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Location</p>
          <p className="pInfo">{props.info.status}</p>
          {props.info.clinician_location.map((event) => (
            <p className="pInfo">{event.location.name}</p>
          ))}
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Email</p>
          <p className="pInfo">{props.info.user.email}</p>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <p className="pTitle">Administrative Controls</p>
          <hr></hr>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub" >User Status</p>
          <p className={statusType(props.info.status)}>
            {props.info.status === 1 ? "Active" : "Discharge"}
          </p>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">User Type</p>
          <p className="pInfo" style={{ textTransform: "Capitalize" }}>
            {props.info.user.roles[0].name}
          </p>
        </Col>
      </Row>
      <Row></Row>
    </Container>
  );
}
