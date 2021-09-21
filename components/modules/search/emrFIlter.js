import { searchClinician, searchEmr } from "../../../utils/dashboardSearch";
import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { HiOutlineFilter } from "react-icons/hi";
import ModalAddPatient from "../../../components/pages/Emr/addPatient";
import Header from "../../../components/header";
import ModalAddClinician from "../../../components/pages/clinician/addClinician";
import ModalAddLocation from "../../../components/pages/location/addLocation";
import ModalAddBusiness from "../../../components/pages/location/addBusiness";
import Modal from "react-bootstrap/Modal";
import { GoPlus } from "react-icons/go";
import MessageService from "../../../services/api/api.message";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Select from "react-select";
import { useBussinessStore } from "../../../store/store";
import { customStyles, renderInput } from "../../../utils/global";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";

export default function emfFilter() {
  const router = useRouter();
  const tab = router.asPath.split("=").pop();
  const dateToday = new Date();
  const [datefrom, setDatefrom] = React.useState(dateToday);
  const bussInfo = useBussinessStore((state) => state.business);
  const [optionsBusiness, setOptionsBusiness] = useState([]);
  useEffect(() => {
    setOptionsBusiness(
      bussInfo.map((event) => ({
        value: event.id,
        label: event.business_name,
      }))
    );
  }, [router]);
  const startChange = (date) => {
    setDatefrom(date);
  }

  return (
    <>
      <form>
        <Container className="divFilter">
          <Row>
            <Col lg={6}>
              <p className="pTitle">Filters</p>
            </Col>
            <Col lg={6}>
              <p className="pClear btnClear">Clear</p>
            </Col>
          </Row>
          <Row>
            <Col lg={12} style={{ marginTop: "-8px" }}>
              <Select
                styles={customStyles}
                options={optionsBusiness}
                instanceId="2"
                placeholder="Select location"
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
