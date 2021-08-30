import MessageService from "../../../services/api/api.message";
import appglobal from "../../../services/api/api.services";
import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import Select from "react-select";
import moment from "moment";
import axios from "axios";
import { customStyles, customStyles_error } from "../../../utils/global";
const fetcher = (url) =>
  MessageService.getLocationNoPage().then((response) => response.data);
export default function addPatient(props) {
  const { data, error } = useSWR("Location", fetcher);
  console.log(error);
  const [errorFname, setErrorFname] = useState("");
  const [errorLname, setErrorLname] = useState("");
  const [location, setLocation] = useState([]);
  const [admissionDate, setAdmissionDate] = useState(new Date());
  const [locid, setLocid] = useState("");
  const [selectLocation, setSelectLocation] = useState("");
  const [state, setState] = React.useState({
    fname: "",
    lname: "",
  });
  useEffect(() => {
    if (data) {
      const dataLoc = [{ value: 0, label: "None" }];
      for (var i = 0; i < data.length; i++) {
        dataLoc.push({
          value: data[i].id,
          label: data[i].name,
        });
      }
      setLocation(dataLoc);
    }
  }, [data]);
  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }
  const goSave = () => {
    var clear = 0;
    if (!state.fname) {
      setErrorFname(true);
      clear = 1;
    }
    if (!state.lname) {
      setErrorLname(true);
      clear = 1;
    }
    if (clear === 0) {
      const formData = new FormData();
      formData.append("family_name", state.lname);
      formData.append("location_id", locid);
      MessageService.addFamily(formData)
        .then((response) => {
          const formData1 = new FormData();
          formData1.append("first_name", state.fname);
          formData1.append("last_name", state.lname);
          formData1.append("family_relationship", "Identified Patient");
          formData1.append("is_identified_person", 1);
          formData1.append("status", 1);
          formData1.append("families_id", response.families_id);
          formData1.append(
            "admission_date",
            moment(admissionDate).format("YYYY-MM-DD")
          );
          MessageService.createPatient(formData1, "add")
            .then((response) => {
              console.log(response);
              props.closeModal();
              mutate(
                appglobal.api.base_api +
                  appglobal.api.get_all_identified_patient +
                  `?&page=1`
              );
            })
            .catch((error) => {
              alert("something went wrong");
              props.closeModal();
            });
        })
        .catch((error) => {});
    }
  };

  return (
    <Container className="conModal">
      <Row>
        <Col lg={12}>
          <p className="pHeader">Add patient</p>
          <p className="pHeadersub">
            This section contains the basic details of the client.
          </p>
        </Col>
        <Col lg={6}>
          <p className="pTitleInput">First Name</p>
          <input
            type="text"
            className={errorFname ? "txtError" : "txtInput"}
            name="fname"
            value={state.fname}
            onChange={handleChange}
          />
        </Col>
        <Col lg={6}>
          <p className="pTitleInput">Last Name</p>
          <input
            type="text"
            className={errorLname ? "txtError" : "txtInput"}
            name="lname"
            value={state.lname}
            onChange={handleChange}
          />
        </Col>
        <Col lg={12}>
          <p className="pTitleInput">Location</p>
          <Select
            styles={customStyles}
            options = {location}
            onChange={(e) => {
              setLocid(e.value);
            }}
          />
        </Col>
        <Col lg={12}>
          <div className="form-inline float-right">
            <button
              type="button"
              onClick={() => {
                props.closeModal();
              }}
              className="btnCancel"
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
