import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import React, { useState, useEffect, useCallback } from "react";
import MessageService from "../../../services/api/api.message";
import { Container, Row, Col } from "react-bootstrap";
import { useTimeStore } from "../../../store/store";
import DateFnsUtils from "@date-io/date-fns";
import Modal from "react-bootstrap/Modal";
import Grid from "@material-ui/core/Grid";
import useSWR, { mutate } from "swr";
import Select from "react-select";
import Cookies from "js-cookie";
import moment from "moment";


import {
  customStyles,
  event_type,
  renderInput,
  customStyles_error,
  activity_type,
} from "../../../utils/global";

export default function modalTime(props) {
  const stateTime = useTimeStore((state) => state.timeInfo);
  const stateAction = useTimeStore((state) => state.action);
  const dateToday = new Date();
  const [datefrom, setDatefrom] = React.useState(dateToday);
  const [dateto, setDateto] = React.useState(moment(dateToday).add(1, "hours"));
  const [invalidDate, setInvalidDate] = useState(false);
  const [activitytype, setActivitytype] = useState("");
  const [notes, setNotes] = useState("");
  const [id, setId] = useState("");
  const [defaultClients, setDefaultClients] = useState([]);
  const [defaultActivity, setDefaultActivity] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedclients, setSelectedClient] = useState("");
  const [errorClients, setErrorclients] = useState(false);
  const [errorActivity, setErrorActivity] = useState(false);
  const startChange = (date) => {
    setDatefrom(date);
  };
  const endChange = (date) => {
    setDateto(date);
  };
  useEffect(() => {
    MessageService.getClients(Cookies.get("token")).then((response) => {
      setClients(
        response.map((client) => ({
          value: client.id,
          label: client.first_name + " " + client.last_name,
        }))
      );
      console.log(response);
    });
  }, []);
  useEffect(() => {
    if (stateAction === "Edit") {
      console.log(stateTime);
      setDatefrom(moment(stateTime[0].date_from));
      setDateto(moment(stateTime[0].date_to));
      setNotes(stateTime[0].notes);
      setId(stateTime[0].id)
      setDefaultActivity({
        value: stateTime[0].activity_type,
        label: stateTime[0].activity_type,
      });
      setActivitytype(stateTime[0].activity_type)
      setDefaultClients({
        value: stateTime[0].clients.id,
        label: stateTime[0].clients.first_name + stateTime[0].clients.last_name,
      });
      setSelectedClient(stateTime[0].clients.id);
    }
  }, [stateTime]);
  function goSave1() {
    var clear = 0;
    if (!selectedclients) {
      setErrorclients(true);
      clear = 1;
    }
    if (!activitytype) {
      setErrorActivity(true);
      clear = 1;
    }
    if (moment(dateto).isBefore(moment(datefrom))) {
      setInvalidDate(true);
      clear = 1;
    }
    if (clear === 0) {
      const formData = new FormData();
      formData.append("clinicians_id", Cookies.get("clinician_id"));
      formData.append("clients_id", selectedclients);
      formData.append("date_from", moment(datefrom).format("YYYY/MM/DD HH:mm"));
      formData.append("date_to", moment(dateto).format("YYYY/MM/DD HH:mm"));
      formData.append("duration", moment(dateto).diff(moment(datefrom)));
      formData.append("activity_type", activitytype);
      formData.append("notes", notes);
      if (stateAction === "Edit") {
        formData.append("_method", "PUT");
      }
      MessageService.createTime(formData, stateAction, id).then((response) => {
        for (var pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
        props.closeModal();
        mutate("TimeEntry");
      });
    }
  }

  return (
    <>
      <Container className="conModal">
        <Row>
          <Col lg={12}>
            <p className="pHeader">Create time entry</p>
            <p className="pHeadersub">
              This section contains the basic details of your time entry.
            </p>
          </Col>
          <Col lg={6}>
            <p className="pTitleInput">Start Time</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justifyContent="space-around">
                <DateTimePicker
                  value={datefrom}
                  TextFieldComponent={renderInput}
                  onChange={endChange}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Col>
          <Col lg={6}>
            <p className="pTitleInput">End Time</p>
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
            <p className="pTitleInput">Clients</p>
            <Select
              styles={errorClients ? customStyles_error : customStyles}
              options={clients}
              value={defaultClients}
              onChange={(e) => {
                setDefaultClients({ value: e.value, label: e.label });
                setSelectedClient(e.value);
              }}
            />
          </Col>
          <Col lg={6}>
            <p className="pTitleInput">Activity Type</p>
            <Select
              styles={errorActivity ? customStyles_error : customStyles}
              options={activity_type}
              value={defaultActivity}
              onChange={(e) => {
                setDefaultActivity({ value: e.value, label: e.label });
                setActivitytype(e.value);
              }}
            />
          </Col>
          <Col lg={12}>
            <p className="pTitleInput">Notes</p>
            <textarea
              className="textarea"
              rows="2"
              cols="50"
              name="notes"
            ></textarea>
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
              <button type="submit" className="btnSave" onClick={goSave1}>
                Save
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
