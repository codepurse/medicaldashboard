import {
    useLocationStore,
    useFilterClinicianStore,
  } from "../../../store/store";
  import { Container, Row, Col } from "react-bootstrap";
  import { customStyles } from "../../../utils/global";
  import React, { useEffect, useState } from "react";
  import Select from "react-select";
  
  export default function emfFilter() {
    const addFilter = useFilterClinicianStore((state) => state.addFilter);
    const emrFilter = useFilterClinicianStore((state) => state.filter);
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
    function goActive(e) {
      if (e.target.checked == true) {
        addFilter([...emrFilter, { label: "status", value: "1" }]);
      } else {
        addFilter(emrFilter.filter((item) => item.value !== "1"));
      }
    }
  
    function goDischarge(e) {
      if (e.target.checked == true) {
        addFilter([...emrFilter, { label: "status", value: "3" }]);
      } else {
        addFilter(emrFilter.filter((item) => item.value !== "3"));
      }
    }
  
    function goAdmin(e) {
      if (e.target.checked == true) {
        addFilter([...emrFilter, { label: "permission", value: "admin" }]);
      } else {
        addFilter(emrFilter.filter((item) => item.value !== "admin"));
      }
    }
  
    function goClinician(e) {
      if (e.target.checked == true) {
        addFilter([...emrFilter, { label: "permission", value: "clinician" }]);
      } else {
        addFilter(emrFilter.filter((item) => item.value !== "clinician"));
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
                    document.getElementById("check3").checked = false;
                    document.getElementById("check4").checked = false;
                    setSelectLocation(null);
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
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col lg={12} style={{ marginBottom: "-8px" }}>
                <p className="pHeadersub">Status</p>
              </Col>
              <Col lg={12}>
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
              <Col lg={12}>
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
            <Row style={{ marginTop: "10px" }}>
              <Col lg={12} style={{ marginBottom: "-8px" }}>
                <p className="pHeadersub">Permission</p>
              </Col>
              <Col lg={12}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue
                    id="check3"
                    onChange={goAdmin}
                  />
                  <label className="form-check-label" htmlFor="check3">
                    Admin
                  </label>
                </div>
              </Col>
              <Col lg={12}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue
                    id="check4"
                    onChange={goClinician}
                  />
                  <label className="form-check-label" htmlFor="check4">
                    Clinician
                  </label>
                </div>
              </Col>
            </Row>
          </Container>
        </form>
      </>
    );
  }