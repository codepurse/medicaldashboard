import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import ModalInfo from "../../../components/modal/modalInfoEvent";
import { Calendar, momentLocalizer } from "react-big-calendar";
import MessageService from "../../../services/api/api.message";
import { Container, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import useSWR, { mutate } from "swr";
import Cookies from "js-cookie";
import moment from "moment";

export default function calendar(props) {
  const fetcher = (url) =>
    MessageService.getEvents(props.id).then((response) => response.data);

  const date = new Date();
  const localizer = momentLocalizer(moment);
  const [showInfo, setShowInfo] = useState(false);
  const [info, setInfoEvent] = useState([]);
  const handleShowEvent = () => setShowInfo(true);
  const handleCloseEvent = () => setShowInfo(false);
  const [myEventsList, setMyEventList] = useState([]);
  const [selectedView, setSelectedview] = useState("day");
  const [month, setMonth] = useState(
    date.toLocaleString("default", { month: "long" })
  );
  const [year, setYear] = useState(date.getFullYear());
  const { data, error } = useSWR("Appointment", fetcher);
  console.log(data);
  console.log(error);

  useEffect(() => {}, []);
  useEffect(() => {
    if (data) {
      console.log(data);
      setMyEventList(data);
    }
  }, [data]);

  const EventT = ({ event }) => {
    return (
      <span>
        <div
          className={event.type === "Session" ? "eventSession" : "eventMeeting"}
        >
          <span className="spanTitle">
            {event.title}
            <br />
            <span
              className={
                event.type === "Session" ? "spanSession" : "spanMeeting"
              }
            >
              {timeNow(event.start)} -{" "}
              {timeNow(moment(event.end).add(moment.duration(-1, "hours")))}
            </span>
          </span>
        </div>
      </span>
    );
  };
  function timeNow(timestart) {
    return new Date(timestart).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function customToolbar(toolbar) {
    const goToBack = () => {
      let mDate = toolbar.date;
      let newDate;
      newDate = new Date(mDate.getFullYear(), mDate.getMonth() - 1, 1);
      setMonth(moment(newDate).format("MMMM"));
      if (month == "January") {
        setYear(year - 1);
      }

      toolbar.onNavigate("prev", newDate);
    };

    const goToNext = () => {
      let mDate = toolbar.date;
      let newDate;
      newDate = new Date(mDate.getFullYear(), mDate.getMonth() + 1, 1);
      setMonth(moment(newDate).format("MMMM"));
      if (month == "December") {
        setYear(year + 1);
      }

      toolbar.onNavigate("next", newDate);
    };

    return (
      <Container fluid className="conToolbar">
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="form-inline">
              <p>
                {month}
                <span> {year}</span>
              </p>
              <i onClick={goToBack}>
                <HiArrowNarrowLeft />
              </i>
              <i>
                <HiArrowNarrowRight onClick={goToNext} />
              </i>
            </div>
          </Col>
          <Col lg={6}>
            <div className="float-right">
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <button
                  type="button"
                  className="btn btn-secondary btnmonth"
                  id={selectedView === "month" ? "eventActive" : ""}
                  onClick={(e) => {
                    setSelectedview("month");
                  }}
                >
                  Month
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btnweek"
                  id={selectedView === "week" ? "eventActive" : ""}
                  onClick={(e) => {
                    setSelectedview("week");
                  }}
                >
                  Week
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btnday"
                  id={selectedView === "day" ? "eventActive" : ""}
                  onClick={(e) => {
                    setSelectedview("day");
                  }}
                >
                  Day
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container
      fluid
      className={
        props.user === "clinician" ? "conCalendarView" : "conCalendar conPages"
      }
    >
      <Row>
        <Col lg={12}>
          <Calendar
            localizer={localizer}
            events={myEventsList.map((ev) => ({
              title: ev.subject,
              start: moment(ev.date_from).toDate(),
              end: moment(ev.date_to).add(moment.duration(1, "hours")).toDate(),
              data: ev,
              type: ev.event_type,
            }))}
            startAccessor="start"
            endAccessor="end"
            components={{
              toolbar: customToolbar,
              event: EventT,
            }}
            style={{ height: 845 }}
            tooltipAccessor={null}
            onSelectEvent={(event) => {
              setInfoEvent(event.data);
              console.log(event.data);
              handleShowEvent(true);
            }}
            view={selectedView}
          />
        </Col>
      </Row>
      <Modal
        centered
        className="modalInfo"
        show={showInfo}
        onHide={handleCloseEvent}
      >
        <ModalInfo infoevent={info} />
      </Modal>
    </Container>
  );
}
