import { useBussinessStore, useSnackStore } from "../../../store/store";
import {
  customStyles,
  customStyles_error,
  options_lead,
} from "../../../utils/global";
import MessageService from "../../../services/api/api.message";
import appglobal from "../../../services/api/api.services";
import timezones from "../../../services/timzone.json";
import { Container, Row, Col, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import Select from "react-select";
import Cookies from "js-cookie";
import moment from "moment";
import axios from "axios";

export default function addLead(props) {
  const [errorName, setErrorName] = useState(false);
  const [relationship, setRelationship] = useState("");
  const [state, setState] = useState({
    first_name: props.action ? props.info.first_name : "",
    last_name: props.action ? props.info.last_name : "",
    relationship: props.action ? props.info.relationship : "",
    phone: props.action ? props.info.phone : "",
    email: props.action ? props.info.email : "",
    Referred_by: props.action ? props.info.Referred_by : "",
  });
  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });

    console.log(state);
  };

  function goSave() {}

  return (
    <Container className="conModal">
      <Row>
        <Col lg={12}>
          <p className="pHeader">Add Lead</p>
        </Col>
        <Col lg={12}>
          <p className="pTitleInput">First Name</p>
          <input
            type="text"
            className={errorName ? "txtError" : "txtInput"}
            name="first_name"
            onChange={handleChange}
          />
        </Col>
        <Col lg={12}>
          <p className="pTitleInput">Last Name</p>
          <input
            type="text"
            className={errorName ? "txtError" : "txtInput"}
            name="last_name"
            onChange={handleChange}
          />
        </Col>
        <Col lg={12}>
          <p className="pTitleInput">Relationship</p>
          <Select options={options_lead} />
        </Col>
        <Col lg={12}>
          <p className="pTitleInput">Phone</p>
          <input
            type="number"
            className={errorName ? "txtError" : "txtInput"}
            name="phone"
            onChange={handleChange}
          />
        </Col>
        <Col lg={12}>
          <p className="pTitleInput">Email</p>
          <input
            type="text"
            className={errorName ? "txtError" : "txtInput"}
            name="email"
            onChange={handleChange}
          />
        </Col>
        <Col lg={6}>
          <p className="pTitleInput">Referred by</p>
          <input
            type="text"
            className={errorName ? "txtError" : "txtInput"}
            name="Referred_by"
            onChange={handleChange}
          />
        </Col>
        <Col lg={6}>
          <p className="pTitleInput">new</p>
          <Button>New</Button>
        </Col>
        <Col lg={12}>
          <div className="form-inline float-right">
            <button
              type="button"
              className="btnCancel"
              onClick={() => props.closeModal()}
            >
              Cancel
            </button>
            <button type="submit" className="btnSave" onClick={goSave}>
              Save
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
