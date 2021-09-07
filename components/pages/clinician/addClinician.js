import { Container, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
import {
  customStyles,
  customStyles_error,
  options_type,
} from "../../../utils/global";

export default function addClinician() {
  const [type, setType] = useState("");
  const [errorLocation, setErrorLocation] = useState("");
  const [errorFname, setErrorFname] = useState("");
  const [errorLname, setErrorLname] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  return (
    <Container className="conModal">
      <Row>
        <Col lg={12}>
          <p className="pHeader">Add clinician</p>
          <p className="pHeadersub">
            This section contains the basic details of the clinician.
          </p>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <p className="pTitleInput">Profile Picture</p>
          <img src=""></img>
        </Col>
        <Col lg={3}>
          <button className="btnSave">Browse</button>
        </Col>
        <Col lg={3}>
          <button className="btnCancel">Delete</button>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <p className="pTitleInput">User Type</p>
          <Select
            isMulti
            styles={customStyles}
            options={options_type}
            value={options_type.filter((option) => option.label === type)}
            onChange={(e) => {
              setType(e);
            }}
          />
        </Col>
        <Col lg={6}>
          <p className="pTitleInput">User Status </p>
          <Select
            isMulti
            styles={customStyles}
            options={options_type}
            value={options_type.filter((option) => option.label === type)}
            onChange={(e) => {
              setType(e);
            }}
          />
        </Col>
        <Col lg={6}>
          <p className="pTitleInput">Location</p>
          <Select
            isMulti
            styles={customStyles}
            options={options_type}
            value={options_type.filter((option) => option.label === type)}
            onChange={(e) => {
              setType(e);
            }}
          />
        </Col>
        <Col lg={6}>
          <p className="pTitleInput">Email</p>
          <input type="text" className="txtInput" name="locations" />
        </Col>
        <Col lg={4}>
          <p className="pTitleInput">First Name</p>
          <input type="text" className="txtInput" name="locations" />
        </Col>
        <Col lg={4}>
          <p className="pTitleInput">Middle Name</p>
          <input type="text" className="txtInput" name="locations" />
        </Col>
        <Col lg={4}>
          <p className="pTitleInput">Last Name</p>
          <input type="text" className="txtInput" name="locations" />
        </Col>
      </Row>
    </Container>
  );
}
