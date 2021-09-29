import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import { IoMdAddCircleOutline, IoMdCloudUpload } from "react-icons/io";
import React, { useState, useEffect, useRef } from "react";
import MessageService from "../../../services/api/api.message";
import { Row, Col } from "react-bootstrap";
import { useSnackStore } from "../../../store/store";
import { AiOutlineDelete } from "react-icons/ai";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import { mutate } from "swr";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
import moment from "moment";
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
  const setSnack = useSnackStore((state) => state.changeState);
  const setSnackMessage = useSnackStore((state) => state.changeMessage);
  const setSnackStyle = useSnackStore((state) => state.changeStyle);
  const [action, setAction] = useState(true); // true if add
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), phonenumber: "", type: "" },
  ]);
  const phoneValue = inputFields.map((input) => input.phonenumber);
  const phoneType = inputFields.map((input) => input.type);

  const [info, setInfo] = useState([]);
  const [marital, setMarital] = useState(
    props.action ? "" : props.memberinfo[0].marital_status
  );
  const [relationship, setRelationship] = useState(
    props.action ? "" : props.memberinfo[0].family_relationship
  );
  const [status, setStatus] = useState(
    props.action ? 1 : props.memberinfo[0].status
  );
  const dateToday = new Date();
  const [bday, setBday] = React.useState(
    props.action ? null : props.memberinfo[0].date_of_birth
  );
  const [admission, setAdmission] = React.useState(
    props.action ? null : props.memberinfo[0].admission_date
  );
  const [discharge, setDischarge] = React.useState(
    props.action ? null : props.memberinfo[0].discharge_date
  );
  const [gender, setGender] = useState(
    props.action ? "" : props.memberinfo[0].gender
  );
  const [ethnic, setEthnic] = useState(
    props.action ? "" : props.memberinfo[0].ethnic
  );
  const [familyId, setFamilId] = useState(props.idfamily);
  const [profilepic, setProfilepic] = useState("");
  const [ss, setSs] = useState(
    props.action ? "" : props.memberinfo[0].social_security
  );
  const [risk, setRisk] = useState(
    props.action ? "" : props.memberinfo[0].risk_category
  );
  const [fnameError, setFnameError] = useState(false);
  const [lnameError, setLnameError] = useState(false);
  const [dischargeError, setDischargeError] = useState(false);
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
    pharmacycontact: props.action ? "" : props.memberinfo[0].pharmacy_number,
    pharmacyaddress: props.action ? "" : props.memberinfo[0].pharmacy_address,
    id: props.action ? "" : props.memberinfo[0].id,
  });
  const handleChange = (evt) => {
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  };

  useEffect(() => {
    props.fullname(state.fname + " " + state.lname);
  }, [state.fname, state.lname]);

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
    console.log(props.memberinfo);
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
      reader.onloadend = function () {
        props.photo(reader.result);
      };
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

  function goSave() {
    var clear = 0;
    const formData = new FormData();
    if (!state.fname) {
      setFnameError(true);
      setSnackMessage("Fill up all the missing fields.");
      setSnack(true);
      setSnackStyle(false);
      clear = 1;
    }
    if (!state.lname) {
      setLnameError(true);
      setSnackMessage("Fill up all the missing fields.");
      setSnack(true);
      setSnackStyle(false);
      clear = 1;
    }
    if (status === 0 && !discharge) {
      setDischargeError(true);
      clear = 1;
    } else if (status === 0 && discharge) {
      if (moment(discharge).isBefore(admission)) {
        setDischargeError(true);
        clear = 1;
      }
    }
    if (clear === 0) {
      formData.append("email", state.email);
      formData.append("families_id", familyId);
      formData.append("marital_status", marital);
      formData.append("first_name", state.fname);
      formData.append("middle_name", state.mname);
      formData.append("last_name", state.lname);
      formData.append("family_relationship", relationship);
      formData.append("gender", gender);
      formData.append("referred_name", state.refname);
      formData.append("referred_company", state.refcom);
      formData.append("referred_email", state.refemail);
      formData.append("referred_phone", state.refphone);
      formData.append("address", state.address);
      formData.append("city", state.city);
      formData.append("state", state.state);
      formData.append("zipcode", state.zip);
      formData.append("phone_number", "");
      formData.append("status", status);
      formData.append("pharmacy_name", "");
      formData.append("pharmacy_address", state.pharmacyaddress);
      formData.append("pharmacy_number", state.pharmacycontact);
      formData.append("pharmacy_contact_person", state.pharmacyperson);
      formData.append("emergency_name", state.contactname);
      formData.append("emergency_number", state.contactnumber);
      formData.append("insurance_plan", state.insurance);
      formData.append("member_id", state.memberid);
      formData.append("group_no", state.groupnumber);
      formData.append("current_medication", state.medication);
      formData.append("ethnic", ethnic);
      formData.append("license_number", state.license);
      formData.append("social_security", ss);
      formData.append("diagnostic_code", state.diagnostic);
      if (bday) {
        formData.append("date_of_birth", moment(bday).format("YYYY/MM/DD"));
      }
      for (let i = 0; i < phoneValue.length; i++) {
        formData.append(`phones[${i}][phone_number]`, phoneValue[i]);
      }
      for (let i = 0; i < phoneType.length; i++) {
        formData.append(`phones[${i}][type]`, phoneType[i]);
      }
      if (status === 0) {
        formData.append(
          "discharge_date",
          moment(discharge).format("YYYY/MM/DD")
        );
      }
      if (!risk) {
        formData.append("risk_category", 4);
      } else {
        formData.append("risk_category", risk);
      }
      if (relationship === "Identified Patient") {
        formData.append("is_identified_person", 1);
      } else {
        formData.append("is_identified_person", 0);
      }
      if (profilepic) {
        formData.append("photo", profilepic, profilepic.name);
      }
      if (admission) {
        formData.append(
          "admission_date",
          moment(admission).format("YYYY-MM-DD")
        );
      }
      if (!props.action) {
        formData.append("_method", "PUT");
      }
      MessageService.createPatient(formData, props.action, state.id)
        .then((response) => {
          setSnackMessage("Profile successfully updated.");
          setSnack(true);
          setSnackStyle(true);
          mutate(props.url);
          props.setAction();
        })
        .catch((error) => {
          console.log(error);
          setSnackMessage("Could not apply changes.");
          setSnack(true);
          setSnackStyle(false);
          mutate(props.url);
          props.setAction();
        });
    }
  }

  return (
    <div className="divProfileInfo">
      <Row>
        <Col lg={12}>
          <p
            className="pTitle"
            onClick={(e) => {
              setOpen(true);
            }}
          >
            Personal Information
          </p>
          <hr></hr>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">First Name</p>
          <input
            type="text"
            className={fnameError ? "txtError" : "txtInput"}
            name="fname"
            onInput={(e) => {
              setFnameError(false);
            }}
            value={state.fname}
            onChange={handleChange}
          />
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Middle Name</p>
          <input
            type="text"
            className={"txtInput"}
            name="mname"
            value={state.mname !== "null" ? state.mname : ""}
            onChange={handleChange}
          />
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Last Name</p>
          <input
            type="text"
            className={lnameError ? "txtError" : "txtInput"}
            name="lname"
            onInput={(e) => {
              setLnameError(false);
            }}
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
              <DateTimePicker
                value={bday}
                TextFieldComponent={renderInput}
                format="dd/mm/yyyy"
                onChange={(date) => {
                  setBday(date);
                }}
              />
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
            value={state.license !== "null" ? state.license : ""}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Social Security</p>
          <input
            type="text"
            className="txtInput"
            maxLength="11"
            value={ss !== "null" ? ss : ""}
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
                <IoMdCloudUpload />
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
                  value={inputField.phonenumber !== "null" ? inputField.phonenumber : ""}
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
                  onChange={(event) =>
                    handleChangeInputselect(inputField.id, event)
                  }
                />
              </Col>
              <Col lg={2} className="align-self-end">
                <div className={inputFields.length === 1 ? "d-none" : ""}>
                  <button
                    className="btnDeletephone"
                    onClick={() => handleRemoveFields(inputField.id)}
                  >
                    <i>
                      {" "}
                      <AiOutlineDelete />
                    </i>
                  </button>
                </div>
              </Col>
            </Row>
          ))}
          <div></div>
          <p className="pAddnum" onClick={handleAddFields}>
            <i>
              <IoMdAddCircleOutline />
            </i>
            Add phone number
          </p>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Email Address</p>
          <input
            type="text"
            className="txtInput"
            name="email"
            value={state.email !== "null" ? state.email : ""}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Address</p>
          <input
            type="text"
            className="txtInput"
            name="address"
            value={state.address !== "null" ? state.address : ""}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">City</p>
          <input
            type="text"
            className="txtInput"
            name="city"
            value={state.city !== "null" ? state.city : ""}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">State</p>
          <input
            type="text"
            className="txtInput"
            name="state"
            value={state.state !== "null" ? state.state : ""}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Zip Code</p>
          <input
            type="text"
            className="txtInput"
            name="zip"
            value={state.zip !== "null" ? state.zip : ""}
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
            value={state.contactname !== "null" ? state.contactname : ""}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Contact Number</p>
          <input
            type="text"
            className="txtInput"
            name="contactnumber"
            value={state.contactnumber !== "null" ? state.contactnumber : ""}
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
            onChange={(e) => {
              setStatus(e.value);
            }}
          />
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Admission Date</p>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
              <DateTimePicker
                value={admission}
                TextFieldComponent={renderInput}
                format="dd/mm/yyyy"
                onChange={(date) => {
                  setAdmission(date);
                }}
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
                invalid={dischargeError}
                format="dd/mm/yyyy"
                onChange={(date) => {
                  setDischarge(date);
                }}
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
            value={state.refname !== "null" ? state.refname : ""}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Company</p>
          <input
            type="text"
            className="txtInput"
            name="refcom"
            value={state.refcom !== "null" ? state.refcom : ""}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Phone Number</p>
          <input
            type="text"
            className="txtInput"
            name="refphone"
            value={state.refphone !== "null" ? state.refphone : ""}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Email</p>
          <input
            type="text"
            className="txtInput"
            name="refemail"
            value={state.refemail !== "null" ? state.refemail : ""}
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
            name="medication"
            value={state.medication !== "null" ? state.medication : ""}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Diagnostic Code</p>
          <input
            type="text"
            className="txtInput"
            name="diagnostic"
            value={state.diagnostic !== "null" ? state.diagnostic : ""}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Risk Category</p>
          <Select
            value={
              risk
                ? options_risk.filter(
                    (option) => option.value === risk.toString()
                  )
                : 4
            }
            options={options_risk}
            styles={customStyles}
            onChange={(e) => setRisk(e.value)}
          />
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Insurance Plan</p>
          <input
            type="text"
            className="txtInput"
            name="insurance"
            value={state.insurance !== "null" ? state.insurance : ""}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Member Id</p>
          <input
            type="text"
            className="txtInput"
            name="memberid"
            value={state.memberid !== "null" ? state.memberid : ""}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Group Number</p>
          <input
            type="text"
            className="txtInput"
            name="groupnumber"
            value={state.groupnumber !== "null" ? state.groupnumber : ""}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={12}>
          <p className="pTitlesub">Rx Bin</p>
          <input
            type="text"
            className="txtInput"
            name="rxbin"
            value={state.rxbin !== "null" ? state.rxbin : ""}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Pharmacy Contact Person</p>
          <input
            type="text"
            className="txtInput"
            name="pharmacyperson"
            value={state.pharmacyperson !== "null" ? state.pharmacyperson : ""}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Pharmacy Contact Number</p>
          <input
            type="text"
            className="txtInput"
            name="pharmacycontact"
            value={state.pharmacycontact !== "null" ? state.pharmacycontact : ""}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={4}>
          <p className="pTitlesub">Pharmacy Contact Address</p>
          <input
            type="text"
            className="txtInput"
            name="pharmacyaddress"
            value={state.pharmacyaddress !== "null" ? state.pharmacyaddress : ""}
            onChange={handleChange}
          ></input>
        </Col>
        <Col lg={12}>
          <div className="float-right" style={{ marginTop: "10px" }}>
            <button className="btnCancel" onClick={props.setAction}>
              Cancel
            </button>
            <button className="btnSave" onClick={goSave}>
              Save
            </button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
