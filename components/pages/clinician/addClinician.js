import MessageService from "../../../services/api/api.message";
import appglobal from "../../../services/api/api.services";
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useSnackStore } from "../../../store/store";
import Select, { components } from "react-select";
import { AiOutlineDelete } from "react-icons/ai";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import { v4 as uuidv4 } from "uuid";

import {
  customStyles,
  customStyles_error,
  options_phone,
  options_type,
  options_status,
} from "../../../utils/global";

export default function addClinician(props) {
  const router = useRouter();
  const setSnack = useSnackStore((state) => state.changeState);
  const setSnackMessage = useSnackStore((state) => state.changeMessage);
  const setSnackStyle = useSnackStore((state) => state.changeStyle);
  const inputFileRef = useRef(null);
  const [errorLocation, setErrorLocation] = useState("");
  const [errorFname, setErrorFname] = useState("");
  const [errorLname, setErrorLname] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [profilepic, setProfilepic] = useState("");
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState("Admin");
  const [userstatus, setUserstatus] = useState({ value: 1, label: "Active" });
  const [locationlist, setLocationlist] = useState([]);
  const [location, setLocation] = useState([]);
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [userId, setUserId] = useState();
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), phonenumber: "", type: "" },
  ]);
  const phoneValue = inputFields.map((input) => input.phonenumber);
  const phoneType = inputFields.map((input) => input.type);
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
        setProfilepic(reader.result);
      };
      reader.readAsDataURL(file);
      setPhoto(file);
    }
  }
  const capitalizeFirstLetter = (
    [first, ...rest],
    locale = navigator.language
  ) => first.toLocaleUpperCase(locale) + rest.join("");

  useEffect(() => {
    MessageService.getLocationNoPage().then((response) => {
      console.log(response);
      setLocationlist(
        response.data.map((location) => ({
          value: location.id,
          label: location.name,
        }))
      );
    });
  }, []);

  const Input = (props) => {
    const { autoComplete = props.autoComplete } = props.selectProps;
    return <components.Input {...props} autoComplete={autoComplete} />;
  };

  useEffect(() => {
    if (props.infoClinician) {
      setFname(props.infoClinician.first_name);
      setLname(props.infoClinician.last_name);
      setMname(props.infoClinician.middle_name);
      setEmail(props.infoClinician.user.email);
      setType(capitalizeFirstLetter(props.infoClinician.user.roles[0].name));
      const data_location = [];
      for (let i = 0; i < props.infoClinician.clinician_location.length; i++) {
        data_location.push({
          value: props.infoClinician.clinician_location[i].location.id,
          label: props.infoClinician.clinician_location[i].location.name,
        });
      }
      setLocation(data_location);
      const data_number = [];
      for (var i = 0; i < props.infoClinician.phones.length; i++) {
        data_number.push({
          id: props.infoClinician.phones[i].id,
          phonenumber: props.infoClinician.phones[i].phone_number,
          type: props.infoClinician.phones[i].type,
        });
      }
      setInputFields(data_number);
      setUserId(props.infoClinician.user_id);
      setProfilepic(props.infoClinician.photo);
      console.log(props.infoClinician.clinician_location);
    }
  }, [props]);

  function goSave() {
    var clear = 0;
    if (!fname) {
      setErrorFname(true);
      clear = 1;
    }
    if (!lname) {
      setErrorLname(true);
      clear = 1;
    }
    if (!email) {
      setErrorEmail(true);
      clear = 1;
    }
    if (!props.action) {
      if (!password) {
        setErrorPassword(true);
        clear = 1;
      }
    }
    if (!location) {
      setErrorLocation(true);
      clear = 1;
    }
    if (password !== confirmpass) {
      setErrorPassword(true);
      clear = 1;
    }
    if (clear === 0) {
      var action = false;
      const formData = new FormData();
      const locationValue = location.map((locationId) => locationId.value);
      console.log(location);
      console.log(locationValue);
      formData.append("role", type);
      formData.append("status", userstatus.value);
      formData.append("first_name", fname);
      formData.append("last_name", lname);
      formData.append("middle_name", fname);
      formData.append("middle_name", lname);
      formData.append("email", email);
      if (password) {
        formData.append("password", password);
      }
      if (photo !== null) {
        formData.append("photo", photo, photo.name);
      }
      for (let i = 0; i < location.length; i++) {
        formData.append(`locations[${i}][id]`, location[i].value);
      }
      for (let i = 0; i < phoneValue.length; i++) {
        formData.append(`phones[${i}][phone_number]`, phoneValue[i]);
      }
      for (let i = 0; i < phoneType.length; i++) {
        formData.append(`phones[${i}][type]`, phoneType[i]);
      }
      if (props.infoClinician) {
        formData.append("_method", "PUT");
        action = true;
      }
      MessageService.createClinicians(formData, action, userId)
        .then((response) => {
          console.log(response);
          if (props.urlInfo === "clinician") {
            setSnackMessage("Clinician added succesfully.");
          } else {
            setSnackMessage("Profile succesfully saved.");
          }
          setSnack(true);
          setSnackStyle(true);
          mutate(props.mutatedata);
          if (action) {
            if (props.urlInfo === "clinician") {
              router.push("/clinician_directory");
            } else {
              router.push("/dashboard");
            }
          } else {
            props.closeModal();
          }
        })
        .catch(function (error) {
          console.log(error);
          setSnackMessage("Something went wrong.");
          setSnack(true);
          setSnackStyle(false);
          if (action) {
            router.push("/clinician_directory");
          } else {
            props.closeModal();
          }
        });
    }
  }

  return (
    <Container className={props.action ? "conModal conProfile" : "conModal"}>
      <Row>
        <Col lg={12} className={props.action ? "d-none" : ""}>
          <p className="pHeader">Add clinician</p>
          <p className="pHeadersub">
            This section contains the basic details of the clinician.
          </p>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col lg={3} style={{ paddingRight: "0px" }}>
          <p className="pTitleInput" style={{ marginBottom: "10px" }}>
            Profile Picture
          </p>
          <input
            onChange={(e) => handleFile(e)}
            ref={inputFileRef}
            id="file-upload"
            type="file"
            accept=".jpg, .png, .jpeg|image"
            className="d-none"
          />
          <img
            src={
              profilepic
                ? appglobal.api.aws + profilepic
                : "/Image/userprofile.png"
            }
            className="imgProfile img-fluid"
          ></img>
        </Col>
        <Col lg={9} className="align-self-center">
          <div>
            <button className="btnSaveUpload" onClick={onBtnClick}>
              Browse Image
            </button>
            <button
              className="btnCancelUpload"
              onClick={() => setProfilepic("")}
            >
              Delete
            </button>
          </div>
          <p className="pTitleInput pUpload">
            Type file PNG or JPG file. Maximum size 4mb
          </p>
        </Col>
      </Row>
      <Row style={{ marginTop: "15px" }}>
        <Col lg={6}>
          <p className="pTitleInput">User Type</p>
          <Select
            styles={customStyles}
            options={options_type}
            value={options_type.filter((option) => option.value === type)}
            onChange={(e) => {
              setType(e.value);
              console.log(e.value);
            }}
            isLoading={false}
          />
        </Col>
        <Col lg={6}>
          <p className="pTitleInput">User Status </p>
          <Select
            styles={customStyles}
            options={options_status}
            value={userstatus}
            onChange={(e) => {
              setUserstatus(e);
            }}
          />
        </Col>
        <Col lg={6}>
          <p className="pTitleInput">Location</p>
          <Select
            styles={errorLocation ? customStyles_error : customStyles}
            isMulti
            options={locationlist}
            value={location}
            onChange={(e) => {
              setLocation(e);
            }}
          />
        </Col>
        <Col lg={6}>
          <p className="pTitleInput">Email</p>
          <input
            type="text"
            className={errorEmail ? "txtError" : "txtInput"}
            name="locations"
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
          />
        </Col>
        <Col lg={4}>
          <p className="pTitleInput">First Name</p>
          <input
            type="text"
            className={errorFname ? "txtError" : "txtInput"}
            value={fname}
            onChange={(e) => {
              setFname(e.currentTarget.value);
            }}
          />
        </Col>
        <Col lg={4}>
          <p className="pTitleInput">Middle Name</p>
          <input
            type="text"
            className="txtInput"
            value={mname}
            onChange={(e) => {
              setMname(e.currentTarget.value);
            }}
          />
        </Col>
        <Col lg={4}>
          <p className="pTitleInput">Last Name</p>
          <input
            type="text"
            className={errorLname ? "txtError" : "txtInput"}
            value={lname}
            onChange={(e) => {
              setLname(e.currentTarget.value);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          {inputFields.map((inputField) => (
            <Row key={inputField.id}>
              <Col lg={6} key={inputField.id}>
                <p className="pTitleInput">Phone Number</p>
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
                <p className="pTitleInput">Phone Type</p>
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
                  components={{ Input }}
                  autoComplete="new-password"
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
          <p className="pAddnum" onClick={handleAddFields}>
            <i>
              <IoMdAddCircleOutline />
            </i>
            Add phone number
          </p>
        </Col>
      </Row>
      <Row>
        <Col lg={6}>
          <p className="pTitleInput">Password</p>
          <input
            type="password"
            className="txtInput"
            className={errorPassword ? "txtError" : "txtInput"}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
            autoComplete="new-password"
          />
        </Col>
        <Col lg={6}>
          <p className="pTitleInput">Confirm Password</p>
          <input
            type="password"
            className="txtInput"
            className={errorPassword ? "txtError" : "txtInput"}
            onChange={(e) => {
              setConfirmpass(e.currentTarget.value);
            }}
            autoComplete="new-password"
          />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <div className="float-right" style={{ marginTop: "10px" }}>
            <button
              className="btnCancel"
              onClick={() => {
                if (props.action) {
                  if (props.urlInfo === "clinician") {
                    router.push("/clinician_directory");
                  } else {
                    router.push("/dashboard");
                  }
                } else {
                  props.closeModal();
                }
              }}
            >
              Cancel
            </button>
            <button className="btnSave" className="btnSave" onClick={goSave}>
              Save
            </button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
