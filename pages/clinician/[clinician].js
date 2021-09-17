import { statusType, instance, riskcategory } from "../../utils/validation";
import React, { Component, useState, useEffect, useRef } from "react";
import Forms from "../../components/pages/Emr/forms/form.js";
import Formpatient from "../../components/pages/Emr/formPatient";
import MembersInfo from "../../components/pages/Emr/memberInfo";
import Notes from "../../components/pages/Emr/notes/notes.js";
import AddClinician from "../../components/pages/clinician/addClinician";
import MessageService from "../../services/api/api.message";
import appglobal from "../../services/api/api.services";
import { Container, Row, Col } from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import { TiArrowBack } from "react-icons/ti";
import { RiEdit2Fill } from "react-icons/ri";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/router";
import { GoPlus } from "react-icons/go";
import useSWR, { mutate } from "swr";
import Select from "react-select";
import Cookies from "js-cookie";
import moment from "moment";
import axios from "axios";
import {
  useMemberInfoStore,
  useSnackStore,
  useModalStore,
  usePatientStore,
} from "../../store/store";
import {
  customStyles,
  customStyles_error,
  options_relationship,
} from "../../utils/global";
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
                className={showDemo ? "activeUl" : ""}
                onClick={() => {
                  setShowDemo(true);
                  setShowEvent(false);
                  setShowTime(false);
                }}
              >
                Demographics
              </li>
              <li
                className={showEvent ? "activeUl" : ""}
                onClick={() => {
                  setShowDemo(false);
                  setShowEvent(true);
                  setShowTime(false);
                }}
              >
                Event Calendar
              </li>
              <li
                className={showTime ? "activeUl" : ""}
                onClick={() => {
                  setShowDemo(false);
                  setShowEvent(false);
                  setShowTime(true);
                }}
              >
                Time Reports
              </li>
            </ul>
          </Col>
        </Row>
        {(() => {
          if (clinicianInfo) {
            return <AddClinician action={Action} infoClinician={clinicianInfo} />;
          }
        })()}
      </Container>
    </>
  );
}
