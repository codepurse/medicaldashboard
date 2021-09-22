import { statusType, instance, riskcategory } from "../utils/validation";
import React, { Component, useState, useEffect, useRef } from "react";
import AddClinician from "../components/pages/clinician/addClinician";
import Appointment from "../components/pages/dashboard/appointment";
import EventCalendar from "../components/modules/calendar/calendar";
import MessageService from "../services/api/api.message";
import { Container, Row, Col } from "react-bootstrap";
import appglobal from "../services/api/api.services";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import Cookies from "js-cookie";
const fetcher = (url) =>
  MessageService.getProfile(Cookies.get("user_id")).then(
    (response) => response.data
  );

export default function myprofile() {
  const { data, error } = useSWR("profile", fetcher);
  const [info, setInfo] = useState(null);
  const Action = true;
  console.log(data);
  console.log(error);

  useEffect(() => {
    if (data) {
      setInfo(data);
    }
  }, [data]);
  return (
    <Container fluid className="conDashboard conPages">
      <Row>
        <Col lg={12}>
          <p className="pHeader">
            <span>My Profile</span>
          </p>
          <p className="pHeadersub">
            This is all the details about your profile.
          </p>
        </Col>
      </Row>
      {(() => {
        if (info) {
          return <AddClinician action={Action} infoClinician={info} urlInfo = "profile" />;
        }
      })()}
    </Container>
  );
}
