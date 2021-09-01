import { statusType, instance, riskcategory } from "../../../utils/validation";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import React, { Component, useState, useEffect, useRef } from "react";
import MessageService from "../../../services/api/api.message";
import appglobal from "../../../services/api/api.services";
import { Container, Row, Col } from "react-bootstrap";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import useSWR, { mutate } from "swr";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
import Cookies from "js-cookie";
import moment from "moment";
import axios from "axios";
import {
  customStyles,
  customStyles_error,
  options_relationship,
  options_marital,
  options_gender,
  options_race,
  options_phone,
  options_status,
  options_risk,
  renderInput,
} from "../../../utils/global";

export default function formPatient(props) {
  const inputFileRef = useRef(null);
  const [action, setAction] = useState(true); // true if add
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), phonenumber: "", type: "" },
  ]);
  const [info, setInfo] = useState([]);
  const [marital, setMarital] = useState(
    props.action ? "" : props.memberinfo[0].marital_status
  );
  const [relationship, setRelationship] = useState(
    props.action ? "" : props.memberinfo[0].family_relationship
  );
  const [status, setStatus] = useState(
    props.action ? "" : props.memberinfo[0].status
  );
  const dateToday = new Date();
  const [bday, setBday] = React.useState(
    props.action ? "" : props.memberinfo[0].date_of_birth
  );
  const [admission, setAdmission] = React.useState(
    props.action ? "" : props.memberinfo[0].admission_date
  );
  const [discharge, setDischarge] = React.useState(
    props.action ? "" : props.memberinfo[0].discharge_date
  );
  const [gender, setGender] = useState(
    props.action ? "" : props.memberinfo[0].gender
  );
  const [ethnic, setEthnic] = useState(
    props.action ? "" : props.memberinfo[0].ethnic
  );
  const [profilepic, setProfilepic] = useState("");
  const [ss, setSs] = useState(
    props.action ? "" : props.memberinfo[0].social_security
  );
  const [risk, setRisk] = useState(
    props.action ? "" : props.memberinfo[0].risk_category
  );
  const [state, setState] = React.useState({
    fname: props.action ? "" : props.memberinfo[0].first_name,
    mname: props.action ? "" : props.memberinfo[0].middle_name,
    lname: props.action ? "" : props.memberinfo[0].last_name,
    license: props.action ? "" : props.memberinfo[0].license_number,
    email: props.action ? "" : props.memberinfo[0].email,
    address: props.action ? "" : props.memberinfo[0].address,
    city: props.action ? "" : props.memberinfo[0].city,
    state: props.action ? "" : props.memberinfo[0].state,
    zip: props.action ? "" : props.memberinfo[0].zip,
    contactname: props.action ? "" : props.memberinfo[0].emergency_name,
    contactnumber: props.action ? "" : props.memberinfo[0].emergency_number,
    refname: props.action ? "" : props.memberinfo[0].referred_name,
    refcom: props.action ? "" : props.memberinfo[0].referred_company,
    refphone: props.action ? "" : props.memberinfo[0].referred_phone,
    refemail: props.action ? "" : props.memberinfo[0].referred_email,
    medication: props.action ? "" : props.memberinfo[0].current_medication,
    diagnostic: props.action ? "" : props.memberinfo[0].diagnostic_code,
    insurance: props.action ? "" : props.memberinfo[0].insurance_plan,
    memberid: props.action ? "" : props.memberinfo[0].member_id,
    groupnumber: props.action ? "" : props.memberinfo[0].group_no,
    rxbin: props.action ? "" : props.memberinfo[0].rx_bin,
    pharmacyperson: props.action
      ? ""
      : props.memberinfo[0].pharmacy_contact_person,
    pharmacycontact: props.action
      ? ""
      : props.memberinfo[0].pharmacy_number,
    pharmacyaddress: props.action
      ? ""
      : props.memberinfo[0].pharmacy_address,
  });
  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  };
  useEffect(() => {
    if (props.memberinfo.length !== 0) {
      setInfo(props);
      const data_number = [];
      for (var i = 0; i < props.memberinfo[0].client_phones.length; i++) {
        data_number.push({
          id: props.memberinfo[0].client_phones[i].id,
          phonenumber: props.memberinfo[0].client_phones[i].phone_number,
          type: props.memberinfo[0].client_phones[i].type,
        });
      }
      setInputFields(data_number);
    }
  }, [props]);

  const onBtnClick = () => {
    inputFileRef.current.click();
  };

  function handleFile(e) {
    var reader = new FileReader();
    let file = e.target.files[0];
    let size = (file.size / 1024 / 1024).toFixed(2);

    if (size > 4.0) {
      alert("Maximum size is 4mb.");
    } else {
      reader.onloadend = function () {};
      reader.readAsDataURL(file);
      setProfilepic(file);
    }
  }

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), phonenumber: "", type: "" },
    ]);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      var val = event.target.value.replace(/\D/g, "");
      val = val.replace(/^(\d{3})(\d{1,3})/, "$1-$2");
      val = val.replace(/^(\d{3})-(\d{3})(.+)/, "$1-$2-$3");

      if (id === i.id) {
        i[event.target.name] = val.substring(0, 12);
      }
      return i;
    });

    setInputFields(newInputFields);
    // console.log(inputFields);
  };

  const handleChangeInputselect = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i["type"] = event.label;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  return (
    <div className="divProfileInfo">
      <Row>
        <Col lg={12}>
          <p className="pTitle">Personal Information</p>
          <hr></hr>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">First Name</p>
          <input
            type="text"
            className="txtInput"
            name="fname"
            onClick={() => {
              setAction(false);
            }}
            value={state.fname}
            onChange={handleChange}
          />
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Middle Name</p>
          <input
            type="text"
            className="txtInput"
            name="mname"
            value={state.mname}
            onClick={() => {
              console.log(action);
            }}
            onChange={handleChange}
          />
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Last Name</p>
          <input
            type="text"
            className="txtInput"
            name="lname"
            value={state.lname}
            onChange={handleChange}
          />
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Relationship Status</p>
          <Select
            options={options_marital}
            styles={customStyles}
            instanceId="1"
            value={options_marital.filter((option) => option.label === marital)}
            onChange={(e) => {
              setMarital(e.value);
            }}
          />
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Family Relationship</p>
          <Select
            options={options_relationship}
            styles={customStyles}
            instanceId="2"
            value={options_relationship.filter(
              (option) => option.label === relationship
            )}
            onChange={(e) => {
              setRelationship(e.value);
            }}
          />
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Date of Birth</p>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
              <DateTimePicker value={bday} TextFieldComponent={renderInput} />
            </Grid>
          </MuiPickersUtilsProvider>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Gender</p>
          <Select
            options={options_gender}
            styles={customStyles}
            value={options_gender.filter((option) => option.label === gender)}
            onChange={(e) => {
              setGender(e.value);
            }}
          />
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Ethnicity</p>
          <Select
            options={options_race}
            styles={customStyles}
            value={options_race.filter((option) => option.label === ethnic)}
            onChange={(e) => {
              setEthnic(e.value);
            }}
          />
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Driver's License Number</p>
          <input
            type="text"
            className="txtInput"
            name="license"
            value={state.license}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Social Security</p>
          <input
            type="text"
            className="txtInput"
            maxLength="11"
            value={ss}
            onInput={(e) => {
              var val = e.currentTarget.value.replace(/\D/g, "");
              val = val.replace(/^(\d{3})(\d{1,2})/, "$1-$2");
              val = val.replace(/^(\d{3})-(\d{2})(.+)/, "$1-$2-$3");
              setSs(val);
            }}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Location</p>
          <Select styles={customStyles} />
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Profile Picture</p>
          <input
            onChange={(e) => handleFile(e)}
            ref={inputFileRef}
            id="file-upload"
            type="file"
            accept=".jpg, .png, .jpeg|image"
            className="d-none"
          />
          <div className="input-group mb-3" style={{ marginTop: "5px" }}>
            <div className="input-group-prepend">
              <button className="btnUpload" type="button" onClick={onBtnClick}>
                Upload
              </button>
            </div>
            <input
              type="text"
              className="form-control txtUpload"
              value={profilepic.name}
            />
          </div>
        </Col>
        <Col lg={12}>
          <p className="pTitle pMargin">Contact Information</p>
          <hr></hr>
        </Col>
        <Col lg={8}>
          {inputFields.map((inputField) => (
            <Row>
              <Col lg={6} key={inputField.id}>
                <p className="pTitlesub">Phone Number</p>
                <input
                  type="text"
                  name="phonenumber"
                  className="txtInput"
                  value={inputField.phonenumber}
                  maxLength="12"
                  onChange={(event) => {
                    handleChangeInput(inputField.id, event);
                  }}
                ></input>
              </Col>
              <Col lg={4}>
                <p className="pTitlesub">Phone Type</p>
                <Select
                  options={options_phone}
                  styles={customStyles}
                  name="type"
                  value={{
                    label: inputField.type,
                    value: inputField.type,
                  }}
                />
              </Col>
              <Col lg={2} className="align-self-end">
                <div className={inputFields.length === 1 ? "d-none" : ""}>
                  <button className="btnDeletephone">
                    <img src="Image/icon/binwhite.png" className="img-fluid" />
                  </button>
                </div>
              </Col>
            </Row>
          ))}
          <p className="pAddnum">
            <img src="Image/icon/addphone.png" />
            Add phone number
          </p>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Email Address</p>
          <input
            type="text"
            className="txtInput"
            name="email"
            value={state.email}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Address</p>
          <input
            type="text"
            className="txtInput"
            name="address"
            value={state.address}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">City</p>
          <input
            type="text"
            className="txtInput"
            name="city"
            value={state.city}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">State</p>
          <input
            type="text"
            className="txtInput"
            name="state"
            value={state.state}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Zip Code</p>
          <input
            type="text"
            className="txtInput"
            name="zip"
            value={state.zip}
            maximum="5"
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={12}>
          <p className="pTitle pMargin">Emergency Contact Information</p>
          <hr></hr>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Contact Name</p>
          <input
            type="text"
            className="txtInput"
            name="contactname"
            value={state.contactname}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Contact Name</p>
          <input
            type="text"
            className="txtInput"
            name="contactnumber"
            value={state.contactnumber}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={12}>
          <p className="pTitle pMargin">Administration</p>
          <hr></hr>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Status</p>
          <Select
            value={options_status.filter((option) => option.value === status)}
            options={options_status}
            styles={customStyles}
          />
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Admission Date</p>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
              <DateTimePicker
                value={admission}
                TextFieldComponent={renderInput}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Discharge Date</p>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
              <DateTimePicker
                value={discharge}
                TextFieldComponent={renderInput}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Col>
        <Col lg={12}>
          <p className="pTitle pMargin">Referral Information</p>
          <hr></hr>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Name</p>
          <input
            type="text"
            className="txtInput"
            name="refname"
            value={state.refname}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Company</p>
          <input
            type="text"
            className="txtInput"
            name="refname"
            value={state.refname}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Phone Number</p>
          <input
            type="text"
            className="txtInput"
            name="refphone"
            value={state.refphone}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Email</p>
          <input
            type="text"
            className="txtInput"
            name="refemail"
            value={state.refemail}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={12}>
          <p className="pTitle pMargin">Clinical Information</p>
          <hr></hr>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Current Medication</p>
          <input
            type="text"
            className="txtInput"
            name="diagnostic"
            value={state.medication}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Diagnostic Code</p>
          <input
            type="text"
            className="txtInput"
            name="diagnostic"
            value={state.diagnostic}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Risk Category</p>
          <Select
            value={options_risk.filter((option) => option.value === risk)}
            options={options_risk}
            styles={customStyles}
          />
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Insurance Plan</p>
          <input
            type="text"
            className="txtInput"
            name="insurance"
            value={state.insurance}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Member Id</p>
          <input
            type="text"
            className="txtInput"
            name="insurance"
            value={state.insurance}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Group Number</p>
          <input
            type="text"
            className="txtInput"
            name="groupnumber"
            value={state.groupnumber}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={12}>
          <p className="pTitlesub">Rx Bin</p>
          <input
            type="text"
            className="txtInput"
            name="rxbin"
            value={state.rxbin}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Pharmacy Contact Person</p>
          <input
            type="text"
            className="txtInput"
            name="pharmacyperson"
            value={state.pharmacyperson}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Pharmacy Contact Number</p>
          <input
            type="text"
            className="txtInput"
            name="pharmacycontact"
            value={state.pharmacycontact}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Pharmacy Contact Address</p>
          <input
            type="text"
            className="txtInput"
            name="pharmacyaddress"
            value={state.pharmacyaddress}
            onChange={handleChange}
          ></input>
        </Col>
      </Row>
    </div>
  );
}
