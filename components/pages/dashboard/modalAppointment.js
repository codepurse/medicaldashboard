import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import MessageService from "../../../services/api/api.message";
import useSWR, { mutate } from "swr";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
import Select from "react-select";
import { customStyles, event_type } from "../../../utils/global";

export default function modal(props) {
  const dateToday = new Date();
  const [value, setValue] = React.useState(dateToday);
  const [dateto, setDateto] = React.useState(moment(dateToday).add(1, "hours"));
  const handleDateChange = (date) => {
    setValue(date);
  };
  const [state, setState] = React.useState({
    event: "",
    locations: "",
    commentary: "",
    notes: "",
    startdate: "",
  });

  const renderInput = (props) => (
    <input
      type="text"
      className="txtInput"
      onClick={props.onClick}
      value={props.value}
      onChange={props.onChange}
    />
  );

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
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
              className="txtInput"
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
                  value={value}
                  TextFieldComponent={renderInput}
                  onChange={handleDateChange}
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
                  onChange={handleDateChange}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Col>
          <Col lg={6}>
            <p className="pTitleInput">Location</p>
            <input
              type="text"
              className="txtInput"
              name="locations"
              value={state.locations}
              onChange={handleChange}
            />
          </Col>
          <Col lg={6}>
            <p className="pTitleInput">Event Type</p>
            <Select options={event_type} styles={customStyles} />
          </Col>
          <Col lg={12}>
            <p className="pTitleInput">Participants</p>
            <Select options={event_type} styles={customStyles} />
          </Col>
          <Col lg={12}>
            <p className="pTitleInput">Commentary</p>
            <textarea
              className="textarea"
              rows="2"
              cols="50"
              name="commentary"
              value={state.commentary}
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
              value={state.notes}
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
            <button type="submit" className="btnSave">
              Save
            </button>
          </div>
        </Col>
      </Container>
    </>
  );
}
