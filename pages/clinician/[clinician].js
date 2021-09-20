import { statusType, instance, riskcategory } from "../../utils/validation";
import React, { Component, useState, useEffect, useRef } from "react";
import AddClinician from "../../components/pages/clinician/addClinician";
import appglobal from "../../services/api/api.services";
import { Container, Row, Col } from "react-bootstrap";
import Appointment from "../../components/pages/dashboard/appointment";
import EventCalendar from "../../components/modules/calendar/calendar";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
const fetcher = (url) => instance.get(url).then((res) => res.data.data);

export default function clinician() {
  const router = useRouter();
  const clinicianId = router.query.clinician;
  const tab = router.query.tabs;
  const url = appglobal.api.base_api + appglobal.api.get_profile + clinicianId; // patient id in uri
  const { data, error } = useSWR(url, fetcher);
  const [showDemo, setShowDemo] = useState(true);
  const [showEvent, setShowEvent] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [clinicianInfo, setClinicianInfo] = useState(null);
  const Action = true;

  useEffect(() => {
    if (data) {
      setClinicianInfo(data);
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    console.log(router.query.tabs);
  }, [router]);

  return (
    <>
      <Container fluid className="conPages conDashboard">
        <Row>
          <Col lg={12}>
            <p className="pHeader">
              <span>Edit Staff</span>
            </p>
            <p className="pHeadersub">Please fill up all required fields.</p>
            <ul className="ulDashboard">
              <li
                className={tab === "demo" ? "activeUl" : ""}
                onClick={() => {
                  router.push(`${clinicianId}?tabs=demo`);
                }}
              >
                Demographics
              </li>
              <li
                className={tab === "event" ? "activeUl" : ""}
                onClick={() => {
                  router.push(`${clinicianId}?tabs=event`);
                }}
              >
                Event Calendar
              </li>
              <li
                className={tab === "time" ? "activeUl" : ""}
                onClick={() => {
                  router.push(`${clinicianId}?tabs=time`);
                }}
              >
                Time Reports
              </li>
            </ul>
          </Col>
        </Row>
        {(() => {
          if (tab === "demo") {
            return (
              <AddClinician action={Action} infoClinician={clinicianInfo} />
            );
          } else if (tab === "event") {
            return <EventCalendar id={clinicianInfo.id} user="clinician" />;
          } else if (tab === "time") {
            return <Appointment />;
          }
        })()}
      </Container>
    </>
  );
}
