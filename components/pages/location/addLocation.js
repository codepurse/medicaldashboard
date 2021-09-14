import MessageService from "../../../services/api/api.message";
import appglobal from "../../../services/api/api.services";
import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import Select from "react-select";
import moment from "moment";
import axios from "axios";
import { customStyles, customStyles_error } from "../../../utils/global";

export default function addLocation(props) {
  const [business, setBusiness] = useState();
  const [timezone, setTimezone] = useState();
  const [errorName, setErrorName] = useState(false);
  const [errorCity, setErrorCity] = useState(false);
  const [errorBuss, setErrorBuss] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [errorCountry, setErrorCountry] = useState(false);
  const [errorTimezone, setErroTimezone] = useState(false);
  const [state, setState] = useState({
    name: "",
    city: "",
    state: "",
    country: "",
  });
  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  };

  return (
    <Container className="conModal">
      <Row>
        <Col lg={12}>
          <p className="pHeader">Add Location</p>
          <p className="pHeadersub">
            This section contains the basic details of the location.
          </p>
        </Col>
        <Col lg={6}>
          <p className="pTitleInput">Name</p>
          <input
            type="text"
            className={errorName ? "txtError" : "txtInput"}
            name="name"
            value={state.name}
            onChange={handleChange}
          />
        </Col>
        <Col lg={6}>
          <p className="pTitleInput">Business</p>
          <Select styles={customStyles} />
        </Col>
        <Col lg={6}>
          <p className="pTitleInput">City</p>
          <input
            type="text"
            className={"txtInput"}
            name="fname"
            value={state.city}
            onChange={handleChange}
          />
        </Col>
        <Col lg={6}>
          <p className="pTitleInput">State</p>
          <input
            type="text"
            className={errorState ? "txtError" : "txtInput"}
            name="state"
            value={state.state}
            onChange={handleChange}
          />
        </Col>
        <Col lg={6}>
          <p className="pTitleInput">Country</p>
          <input
            type="text"
            className={errorState ? "txtError" : "txtInput"}
            name="country"
            value={state.country}
            onChange={handleChange}
          />
        </Col>
        <Col lg={6}>
          <p className="pTitleInput">Timezone</p>
          <Select styles={customStyles} />
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
            <button type="submit" className="btnSave">
              Save
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
