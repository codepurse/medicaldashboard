import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import { useLocationStore, useFilterEmrStore } from "../../../store/store";
import { customStyles, renderInput } from "../../../utils/global";
import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import { useRouter } from "next/router";
import Select from "react-select";
import moment from "moment";

export default function emfFilter() {
  const router = useRouter();
  const tab = router.asPath.split("=").pop();
  const dateToday = new Date();
  const [datefrom, setDatefrom] = React.useState(dateToday);
  const addFilter = useFilterEmrStore((state) => state.addFilter);
  const emrFilter = useFilterEmrStore((state) => state.filter);
  const locationInfo = useLocationStore((state) => state.location);
  const [optionsLocation, setOptionsLocation] = useState([]);
  const [selectLocation, setSelectLocation] = useState([]);
  useEffect(() => {
    if (locationInfo) {
      setOptionsLocation(
        locationInfo.map((event) => ({
          value: event.id,
          label: event.name,
        }))
      );
    }
  }, [locationInfo]);
  const startChange = (date) => {
    setDatefrom(date);
    const check = (obj) => obj.label === "date";
    if (!emrFilter.some(check)) {
      addFilter([
        ...emrFilter,
        { label: "date", value: moment(date).format("YYYY-MM-DD") },
      ]);
    } else {
      addFilter(
        emrFilter.map((el) =>
          el.label === "date"
            ? { ...el, label: "date", value: moment(date).format("YYYY-MM-DD") }
            : el
        )
      );
    }
  };

  function goActive(e) {
    if (e.target.checked == true) {
      addFilter([...emrFilter, { label: "status", value: "1" }]);
    } else {
      addFilter(emrFilter.filter((item) => item.value !== "1"));
    }
  }

  function goDischarge(e) {
    if (e.target.checked == true) {
      addFilter([...emrFilter, { label: "status", value: "0" }]);
    } else {
      addFilter(emrFilter.filter((item) => item.value !== "0"));
    }
  }

  function goLocation(e) {
    const check = (obj) => obj.label === "location";
    setSelectLocation({ value: e.value, label: e.label });
    if (!emrFilter.some(check)) {
      addFilter([...emrFilter, { label: "location", value: e.value }]);
    } else {
      addFilter(
        emrFilter.map((el) =>
          el.label === "location"
            ? { ...el, label: "location", value: e.value }
            : el
        )
      );
    }
  }

  return (
    <>
      <form>
        <Container className="divFilter">
          <Row>
            <Col lg={6} md={6} sm={6} xs={6}>
              <p className="pTitle" onClick={() => console.log(emrFilter)}>
                Filters
              </p>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6}>
              <p
                className="pClear btnClear"
                onClick={() => {
                  addFilter([]);
                  document.getElementById("check1").checked = false;
                  document.getElementById("check2").checked = false;
                  setSelectLocation(null);
                  setDatefrom(null);
                }}
              >
                Clear
              </p>
            </Col>
          </Row>
          <Row>
            <Col lg={12} style={{ marginTop: "-8px" }}>
              <Select
                styles={customStyles}
                options={optionsLocation}
                instanceId="2"
                value={selectLocation}
                placeholder="Select location"
                onChange={goLocation}
              />
            </Col>
            <Col lg={12} style={{ marginTop: "10px" }}>
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
          </Row>
          <Row style={{ marginTop: "10px" }}>
            <Col lg={12} style={{ marginBottom: "-8px" }}>
              <p className="pHeadersub">Status</p>
            </Col>
            <Col lg={6}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue
                  id="check1"
                  onChange={goActive}
                />
                <label className="form-check-label" htmlFor="check1">
                  Active
                </label>
              </div>
            </Col>
            <Col lg={6}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue
                  id="check2"
                  onChange={goDischarge}
                />
                <label className="form-check-label" htmlFor="check2">
                  Discharge
                </label>
              </div>
            </Col>
          </Row>
        </Container>
      </form>
    </>
  );
}