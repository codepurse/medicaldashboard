import MessageService from "../services/api/api.message";
import Cookies from "js-cookie";
import { Container, Row, Col, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { AiFillPrinter } from "react-icons/ai";
import { permission, timeType } from "../utils/validation";
import { TiExport } from "react-icons/ti";
import { RiFileExcel2Line } from "react-icons/ri";
import { GrDocumentPdf } from "react-icons/gr";
import { renderInput_time, customStyles_time, customStyles } from "../utils/global";
import Avatar from "@material-ui/core/Avatar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Table from "react-bootstrap/Table";
import Header from "../components/header";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import { timeEntry_option } from "../utils/global";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { HiDocumentReport } from "react-icons/hi";
export default function timeReporting() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [timeReportingData, setTimeReportingData] = useState([]);
  const [clinicians, setClinicians] = useState([]);
  const [indClient, setIndClient] = useState({ label: "All", value: "" });
  const [indClinician, setIndClinician] = useState("");
  const [indActivityType, setIndActivityType] = useState({
    label: "All",
    value: "",
  });
  const [clients, setClients] = useState([]);
  const [clinicianID, setClinicianID] = useState([]);
  const [clientID, setClientID] = useState("");
  const [activityType, setActivityType] = useState("");
  const [totalhours, setTotalhours] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);

  const client_option = clients.map((client) => ({
    value: client.value,
    label: client.label,
  }));

  useEffect(() => {
    MessageService.getParticipants(Cookies.get("token")).then((response) => {
      setClinicians(
        response.map((clinician) => ({
          value: clinician.id,
          label: `${clinician.first_name} ${clinician.last_name}`,
        }))
      );
    });

    MessageService.getClients(Cookies.get("token")).then((response) => {
      let clientAll = [
        {
          value: "",
          label: "All",
        },
      ];

      for (var i = 0; i < response.length; i++) {
        clientAll.push({
          value: response[i].id,
          label: `${response[i].first_name} ${response[i].last_name}`,
        });
      }

      setClients(clientAll);
    });
  }, []);

  useEffect(() => {
    if (endDate < startDate) {
      setEndDate(startDate);
    }
  }, [startDate, endDate]);

  const converter = (start, end) => {
    const startdate = moment(start);
    const enddate = moment(end);
    const diff = enddate.diff(startdate);
    const diffDuration = moment.duration(diff);
    const diffhours = diffDuration.hours();
    const diffmins = diffDuration.minutes();
    const diffdays = diffDuration.days();
    const daysConvertToHours = diffdays * 24;
    const totalHours = daysConvertToHours + diffhours;
    const decimaltime = moment
      .duration(`${totalHours}:${diffmins}`)
      .asHours()
      .toFixed(2);
    return parseFloat(decimaltime);
  };

  const exportExcel = () => {
    if (timeReportingData.length == 0) {
      setOpenAlert(true);
    } else {
      let params = `?type=${"xls"}&from=${moment(startDate).format(
        "yyyy-MM-DD "
      )}&to=${moment(endDate).format(
        "yyyy-MM-DD "
      )}&clinicians_id=${clinicianID}&clients_id=${clientID}&activity_type=${activityType}`;

      MessageService.exportFile(params, "xls").then((response) => {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Time Reporting.xls");
        document.body.appendChild(link);
        link.click();
      });
    }
  };

  const exportPdf = () => {
    if (timeReportingData.length == 0) {
      setOpenAlert(true);
    } else {
      let params = `?type=${"pdf"}&from=${moment(startDate).format(
        "yyyy-MM-DD "
      )}&to=${moment(endDate).format(
        "yyyy-MM-DD "
      )}&clinicians_id=${clinicianID}&clients_id=${clientID}&activity_type=${activityType}`;

      MessageService.exportFile(params, "pdf").then((response) => {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Time Reporting.pdf");
        document.body.appendChild(link);
        link.click();
      });
    }
  };

  const exportPrint = () => {
    if (timeReportingData.length == 0) {
      setOpenAlert(true);
    } else {
      window.open("/time_reporting_print");
    }
  };

  const handleGenerateReport = () => {
    let params;
    if (clinicianID.length == 0 || clinicianID == "") {
      params = `?from=${moment(startDate).format("yyyy-MM-DD")}&to=${moment(
        endDate
      ).format(
        "yyyy-MM-DD"
      )}&clients_id=${clientID}&activity_type=${activityType}`;
    } else {
      params = `?from=${moment(startDate).format("yyyy-MM-DD")}&to=${moment(
        endDate
      ).format(
        "yyyy-MM-DD"
      )}&clients_id=${clientID}&activity_type=${activityType}`;
      let test = `?from=${moment(startDate).format("yyyy-MM-DD")}&to=${moment(
        endDate
      ).format(
        "yyyy-MM-DD"
      )}&clients_id=${clientID}&activity_type=${activityType}`;

      for (let i = 0; i < clinicianID.length; i++) {
        test = params.concat(`&clinicians_id[${i}]=${clinicianID[i].value}`);
        params = test;
      }
    }

    MessageService.getTimeReporting(params).then((response) => {
      localStorage.setItem("print", JSON.stringify(response));
      let hours = 0;
      for (let i = 0; i < response.length; i++) {
        hours += converter(response[i].date_from, response[i].date_to);
      }
      setTotalhours(hours);
      localStorage.setItem("total", `${hours.toFixed(2)}`);
      setTimeReportingData(response);
      console.log(response);
    });
  };

  return (
    <>
      <Header />
      <Container fluid className="conPages">
        <Container fluid style={{ padding: "0px" }}>
          <Row>
            <Col lg={8}>
              <p className="timeReportingTitle">Clinicians</p>
              <Select
                placeholder="All"
                value={indClinician}
                styles={customStyles_time}
                isMulti
                options={clinicians}
                onChange={(e) => {
                  setClinicianID(e);
                  setIndClinician(e);
                }}
              />
            </Col>
            <Col lg={4} style={{ marginTop: "25px" }}>
              <div className="float-right">
                <div className="form-inline" style={{ width: "100%" }}>
                  <button
                    className="btnBlue btnGenerate"
                    onClick={() => handleGenerateReport()}
                  >
                    <i>
                      <HiDocumentReport />
                    </i>
                    <span>Generate Report</span>
                  </button>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      className="btnExport"
                    >
                      <span>
                        <TiExport /> Export
                      </span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          exportExcel("xls");
                        }}
                      >
                        <i>
                          <RiFileExcel2Line />
                        </i>
                        <span>Excel</span>
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          exportPdf("pdf");
                        }}
                      >
                        <i>
                          <GrDocumentPdf />
                        </i>
                        <span> Pdf</span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <button
                    className="btnBlue btnPrint"
                    onClick={() => {
                      exportPrint();
                    }}
                  >
                    <i>
                      <AiFillPrinter />
                    </i>
                    <span>Print</span>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container className="conFilter" style={{ padding: "0px" }}>
          <Row style={{ marginTop: "15px" }}>
            <Col lg={3}>
              <p className="timeReportingTitle">Clients</p>
              <Select
                value={indClient}
                options={client_option}
                styles={customStyles_time}
                onChange={(e) => {
                  setClientID(e.value);
                  setIndClient(e);
                }}
              />
            </Col>
            <Col lg={3}>
              <p className="timeReportingTitle">Activity Type </p>
              <Select
                options={timeEntry_option}
                value={indActivityType}
                styles={customStyles_time}
                onChange={(e) => {
                  setActivityType(e.value);
                  setIndActivityType(e);
                }}
              />
            </Col>
            <Col lg={3}>
              <p className="timeReportingTitle">Start Date</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justifyContent="space-around">
                  <DateTimePicker
                    value={startDate}
                    TextFieldComponent={renderInput_time}
                    onChange={(date) => {
                      setStartDate(date);
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Col>
            <Col lg={3}>
              <p className="timeReportingTitle">Start Date</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justifyContent="space-around">
                  <DateTimePicker
                    value={endDate}
                    TextFieldComponent={renderInput_time}
                    onChange={(date) => {
                      setEndDate(date);
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Col>
          </Row>
        </Container>
        <Row style={{ marginTop: "10px" }}>
          <Col lg={12}>
            <div className="conTable">
              <Table id="no-more-tables">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Clinician</th>
                    <th>Client</th>
                    <th>Activity Type</th>
                    <th>Time Logged(Hours)</th>
                  </tr>
                </thead>
                <tbody>
                  {timeReportingData?.map((event, i) => (
                    <tr key={i}>
                      <td>
                        <p>{`${moment(event.date_from).format("lll")}`}</p>
                        <p className="pDay">
                          {moment(event.date_from).format("dddd")}
                        </p>
                      </td>
                      <td>
                        <p>
                          {(() => {
                            try {
                              return (
                                <>
                                  <div className="form-inline">
                                    {event.clinicians.photo ? (
                                      <Avatar
                                        className="avatarImage"
                                        src={
                                          appglobal.api.aws +
                                          event.clinicians.photo
                                        }
                                      />
                                    ) : (
                                      <Avatar className="avatar">
                                        {event.clinicians.first_name.charAt(0) +
                                          event.clinicians.last_name.charAt(0)}
                                      </Avatar>
                                    )}
                                    <div>
                                      <p>
                                        {event.clinicians.first_name +
                                          " " +
                                          event.clinicians.last_name}
                                      </p>
                                    </div>
                                  </div>
                                </>
                              );
                            } catch (error) {
                              console.log(error);
                            }
                          })()}
                        </p>
                      </td>
                      <td>
                        <p>
                          {`${event.clients.first_name} ${event.clients.last_name}`}
                        </p>
                      </td>
                      <td>
                        <p
                          className={timeType(event.activity_type)}
                        >{`${event.activity_type}`}</p>
                      </td>
                      <td>
                        <p>{converter(event.date_from, event.date_to)}</p>
                      </td>
                    </tr>
                  ))}
                  {timeReportingData.length !== 0 ? (
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>Total: {`${totalhours.toFixed(2)}`}</td>
                    </tr>
                  ) : (
                    ""
                  )}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
      <Dialog
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"No Data Found"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            No Data Found has been found in the table
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenAlert(false);
            }}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
