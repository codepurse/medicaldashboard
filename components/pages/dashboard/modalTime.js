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
  activity_type,
} from "../../../utils/global";

export default function modal(props) {
  const dateToday = new Date();
  const [datefrom, setDatefrom] = React.useState(dateToday);
  const [dateto, setDateto] = React.useState(moment(dateToday).add(1, "hours"));
  const [invalidDate, setInvalidDate] = useState(false);
  const [activitytype, setActivitytype] = useState("");
  const [notes, setNotes] = useState("");
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
    });
  }, []);

  function goSave() {
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
  }

  return (
    <>
      <Container className="conModal">
        <Row>
          <Col lg={12}>
            <p className="pHeader">Create time entry</p>
            <p className="pHeadersub">
              This section contains the basic details of your time entry
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
          </Col>
          <Col lg={6}>
            <p className="pTitleInput">Clients</p>
            <Select
              className={errorClients ? customStyles_error : customStyles}
              options={clients}
              value={defaultClients}
              onChange={(e) => {
                setDefaultClients({ value: e.id, label: e.label });
                setSelectedClient(e.id);
              }}
            />
          </Col>
          <Col lg={6}>
            <p className="pTitleInput">Activity Type</p>
            <Select
              className={errorActivity ? customStyles_error : customStyles}
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
              <button type="submit" className="btnSave" onClick={goSave}>
                Save
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
