import MessageService from "../../../services/api/api.message";
import appglobal from "../../../services/api/api.services";
import timezones from "../../../services/timzone.json";
import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import Select from "react-select";
import moment from "moment";
import axios from "axios";
import { useBussinessStore, useSnackStore } from "../../../store/store";
import Cookies from "js-cookie";
import { customStyles, customStyles_error } from "../../../utils/global";

export default function addLocation(props) {
  const setSnack = useSnackStore((state) => state.changeState);
  const setSnackMessage = useSnackStore((state) => state.changeMessage);
  const setSnackStyle = useSnackStore((state) => state.changeStyle);
  const [business, setBusiness] = useState();
  const [timezone, setTimezone] = useState();
  const [errorName, setErrorName] = useState(false);
  const [errorCity, setErrorCity] = useState(false);
  const [errorBuss, setErrorBuss] = useState(false);
  const [errorState, setErrorState] = useState(false);
  const [errorCountry, setErrorCountry] = useState(false);
  const [errorTimezone, setErroTimezone] = useState(false);
  const bussInfo = useBussinessStore((state) => state.business);
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
  const timezone_option = timezones.map((timezone) => ({
    value: timezone.text,
    label: timezone.text,
  }));

  function goSave() {
    var clear = 0;
    if (!state.name) {
      setErrorName(true);
      clear = 1;
    }
    if (!state.city) {
      setErrorCity(true);
      clear = 1;
    }
    if (!state.state) {
      setErrorState(true);
      clear = 1;
    }
    if (!state.country) {
      setErrorCountry(true);
      clear = 1;
    }
    if (!business) {
      setErrorBuss(true);
      clear = 1;
    }
    if (!timezone) {
      setErroTimezone(true);
      clear = 1;
    }
    if (clear === 0) {
      const formData = new FormData();
      formData.append("business_id", business);
      formData.append("name", state.name);
      formData.append("city", state.city);
      formData.append("state_name", state.state);
      formData.append("county", state.county);
      formData.append("timezone", timezone);
      formData.append("status", 1);
      MessageService.createLocation(formData)
        .then((response) => {
          mutate("LocationDirectory");
          setSnackMessage("Location sucessfully created.");
          setSnack(true);
          setSnackStyle(true);
          props.closeModal();
        })
        .catch((error) => {
          setSnackMessage("Something went wrong");
          setSnack(true);
          setSnackStyle(false);
          props.closeModal();
        });
    }
  }

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
          <Select
            styles={errorBuss ? customStyles_error : customStyles}
            options={bussInfo.map((event) => ({
              value: event.id,
              label: event.business_name,
            }))}
            onChange={(e) => {
              setBusiness(e.value);
            }}
          />
        </Col>
        <Col lg={6}>
          <p className="pTitleInput">City</p>
          <input
            type="text"
            className={errorCity ? "txtError" : "txtInput"}
            name="city"
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
            className={errorCountry ? "txtError" : "txtInput"}
            name="country"
            value={state.country}
            onChange={handleChange}
          />
        </Col>
        <Col lg={6}>
          <p className="pTitleInput">Timezone</p>
          <Select
            styles={errorTimezone ? customStyles_error : customStyles}
            options={timezone_option}
            onChange={(e) => {
              setTimezone(e.value);
            }}
          />
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
