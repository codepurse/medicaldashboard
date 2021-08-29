import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import MessageService from "../../../services/api/api.message";
import useSWR, { mutate } from "swr";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import { useAppointmentStore } from "../../../store/store";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import Cookies from "js-cookie";
import Select from "react-select";
import {
  customStyles,
  event_type,
  renderInput,
  customStyles_error,
} from "../../../utils/global";
export default function modal(props) {
  const stateAppointment = useAppointmentStore(
    (state) => state.appointmentInfo
  );
  const stateAction = useAppointmentStore((state) => state.action);
  const dateToday = new Date();
  const [datefrom, setDatefrom] = React.useState(dateToday);
  const [dateto, setDateto] = React.useState(moment(dateToday).add(1, "hours"));
  const [participant, setParticipants] = useState([]);
  const [errorEvent, setErrorvent] = useState(false);
  const [errorLocation, setErrorLocation] = useState(false);
  const [errorMember, setErrorMember] = useState(false);
  const [invalidDate, setInvalidDate] = useState(false);
  const [eventtype, setEventtype] = useState("Session");
  const [members, setMembers] = useState([]);
  const [state, setState] = React.useState({
    event: "",
    locations: "",
    commentary: "",
    notes: "",
    participants: "",
    endDate: "",
  });
  const startChange = (date) => {
    setDatefrom(date);
  };
  const endChange = (date) => {
    setDateto(date);
  };
  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }
  useEffect(() => {
    MessageService.getParticipants(Cookies.get("token")).then((response) => {
      setParticipants(
        response.map((location) => ({
          value: location.id,
          label: location.first_name,
        }))
      );
    });
  }, []);

  useEffect(() => {
    if (stateAction === "Edit") {
      console.log(stateAction);
      console.log(stateAppointment);
      setState((prev) => ({
        ...prev,
        event: stateAppointment[0].subject,
        locations: stateAppointment[0].location,
      }));
    }
  }, [stateAppointment]);
  function goSave() {
    var clear = 0;
    if (!state.event) {
      setErrorvent(true);
      clear = 1;
    }
    if (!state.locations) {
      setErrorLocation(true);
      clear = 1;
    }
    if (members.length === 0) {
      setErrorMember(true);
      clear = 1;
    }
    if (moment(dateto).isBefore(moment(datefrom))) {
      setInvalidDate(true);
    }
    if (clear === 0) {
      const formData = new FormData();
      const participantValue = members.map(
        (participantId) => participantId.value
      );
      formData.append("clinician_id", Cookies.get("clinician_id"));
      formData.append("date_from", moment(datefrom).format("YYYY/MM/DD H:mm"));
      formData.append("date_to", moment(dateto).format("YYYY/MM/DD H:mm"));
      formData.append("subject", state.event);
      formData.append("location", state.locations);
      formData.append("event_type", eventtype);
      if (state.notes !== null) {
        formData.append("notes", state.notes);
      }
      if (!state.commentary) {
        formData.append("description", "");
      } else {
        formData.append("description", state.commentary);
      }
      for (let i = 0; i < participantValue.length; i++) {
        formData.append(
          `participants[${i}][clinician_id]`,
          participantValue[i]
        );
      }
      MessageService.createEvent(formData).then((response) => {
        props.closeModal();
        mutate("Appointment");
      });
    }
  }

  return (
    <>
      <Container className="conModal">
        <Row>
          <Col lg={12}>
            <p className="pHeader">Create event</p>
            <p className="pHeadersub">
              This section contains the basic details of your event.
            </p>
          </Col>
          <Col lg={12}>
            <p className="pTitleInput">Event Name</p>
            <input
              type="text"
              className={errorEvent ? "txtError" : "txtInput"}
              name="event"
              value={state.event}
              onChange={handleChange}
            />
          </Col>
          <Col lg={6}>
            <p className="pTitleInput">Start Date</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justifyContent="space-around">
                <DateTimePicker
                  value={datefrom}
                  TextFieldComponent={renderInput}
                  onChange={startChange}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Col>
          <Col lg={6}>
            <p className="pTitleInput">End Date</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justifyContent="space-around">
                <DateTimePicker
                  value={dateto}
                  TextFieldComponent={renderInput}
                  onChange={endChange}
                  invalid={invalidDate}
                />
              </Grid>
            </MuiPickersUtilsProvider>
            <p className={invalidDate ? "pError" : "pError d-none"}>
              End date must be in range.
            </p>
          </Col>
          <Col lg={6}>
            <p className="pTitleInput">Location</p>
            <input
              type="text"
              className={errorLocation ? "txtError" : "txtInput"}
              name="locations"
              onChange={handleChange}
              value={state.locations}
            />
          </Col>
          <Col lg={6}>
            <p className="pTitleInput">Event Type</p>
            <Select
              options={event_type}
              styles={customStyles}
              defaultValue={{ value: "Session", label: "Session" }}
              onChange={(e) => {
                setEventtype(e.value);
              }}
            />
          </Col>
          <Col lg={12}>
            <p className="pTitleInput">Participants</p>
            <Select
              isMulti
              styles={errorMember ? customStyles_error : customStyles}
              options={participant}
              onChange={(e) => {
                setMembers(e);
              }}
            />
          </Col>
          <Col lg={12}>
            <p className="pTitleInput">Commentary</p>
            <textarea
              className="textarea"
              rows="2"
              cols="50"
              name="commentary"
              onChange={handleChange}
            ></textarea>
          </Col>
          <Col lg={12}>
            <p className="pTitleInput">Notes</p>
            <textarea
              className="textarea"
              rows="2"
              cols="50"
              name="notes"
              onChange={handleChange}
            ></textarea>
          </Col>
        </Row>
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
      </Container>
    </>
  );
}
