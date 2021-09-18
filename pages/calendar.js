import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Container, Row, Col } from "react-bootstrap";
import MessageService from "../services/api/api.message";
import Cookies from "js-cookie";
import moment from "moment";
import useSWR, { mutate } from "swr";
const fetcher = (url) =>
  MessageService.getEvents(Cookies.get("clinician_id")).then(
    (response) => response.data
  );
export async function getServerSideProps(context) {
  const lang = context.req.cookies["clinician_id"];
  const cookieSWR = context.req.cookies["token"];
  const dataSSR = await MessageService.getEventsSSR(lang, cookieSWR).then(
    (response) => response.data
  );
  return {
    props: {
      results: JSON.parse(JSON.stringify(dataSSR)),
    },
  };
}

export default function calendar({ results }) {
  const localizer = momentLocalizer(moment);
  const [myEventsList, setMyEventList] = useState(results);
  const { data, error } = useSWR("Appointment", fetcher, {
    fallbackData: results,
  });
  console.log(data);
  console.log(error)

  useEffect(() => {
    if (data) {
      console.log(data);
      setMyEventList(data);
    }
  }, [data]);

  return (
    <Container fluid className="conCalendar conPages">
      <Row>
        <Col lg={12}>
          <Calendar
            localizer={localizer}
            events={myEventsList.map((ev) => ({
              title: ev.subject,
              start: moment(ev.date_from).toDate(),
              end: moment(ev.date_to).add(moment.duration(1, "hours")).toDate(),
              data: ev,
            }))}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 800 }}
          />
        </Col>
      </Row>
    </Container>
  );
}
