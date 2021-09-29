import { customStyles, customStyles_error } from "../../../utils/global";
import { useBussinessStore, useSnackStore } from "../../../store/store";
import MessageService from "../../../services/api/api.message";
import appglobal from "../../../services/api/api.services";
import timezones from "../../../services/timzone.json";
import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import Select from "react-select";
import Cookies from "js-cookie";
import moment from "moment";
import axios from "axios";

export default function addBusiness(props) {
  const setSnack = useSnackStore((state) => state.changeState);
  const setSnackMessage = useSnackStore((state) => state.changeMessage);
  const setSnackStyle = useSnackStore((state) => state.changeStyle);
  const [bussId, setBussId] = useState();
  const [errorBussname, setErrorBussname] = useState(false);
  const [errorBussadd, setErrorBussadd] = useState(false);
  const [state, setState] = useState({
    bussName: props.action ? props.info.business_name : "",
    bussAdd: props.action ? props.info.business_address : "",
  });
  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  };
  useEffect(() => {
    if (props.info) {
      setBussId(props.info.id);
    }
  }, []);

  function goSave() {
    var clear = 0;
    if (!state.bussName) {
      setErrorBussname(true);
      clear = 1;
    }
    if (!state.bussAdd) {
      setErrorBussadd(true);
      clear = 1;
    }
    if (clear === 0) {
      const formData = new FormData();
      formData.append("business_name", state.bussName);
      formData.append("business_address", state.bussAdd);
      formData.append("status", 1);
      if (props.action) {
        formData.append("_method", "PUT");
      }
      MessageService.createBusiness(formData, props.action, bussId)
        .then((response) => {
          mutate(
            appglobal.api.base_api +
              appglobal.api.get_all_business +
              `?&page=1`
          );
          setSnackMessage("Business sucessfully created.");
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
          <p className="pHeader">Add Business</p>
          <p className="pHeadersub">
            This section contains the basic details of the business.
          </p>
        </Col>
        <Col lg={6}>
          <p className="pTitleInput">Business Name</p>
          <input
            type="text"
            className={errorBussname ? "txtError" : "txtInput"}
            name="bussName"
            value={state.bussName}
            onChange={handleChange}
          />
        </Col>
        <Col lg={6}>
          <p className="pTitleInput">Business Address</p>
          <input
            type="text"
            className={errorBussadd ? "txtError" : "txtInput"}
            name="bussAdd"
            value={state.bussAdd}
            onChange={handleChange}
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
