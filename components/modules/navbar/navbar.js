import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import { RiNotification3Line } from "react-icons/ri";
import { useSettingStore } from "../../../store/store";
import MessageService from "../../../services/api/api.message";
import useSWR from "swr";
import moment from "moment";
import { MdClose } from "react-icons/md";
import Cookies from "js-cookie";
const fetcher = (url) =>
  MessageService.getNotif(Cookies.get("clinician_id")).then(
    (response) => response.data
  );
export default function navbar() {
  const people = useSettingStore((state) => state.people);
  const [show, setShow] = useState(false);
  const [showEvents, setShowEvents] = useState(true);
  const [showMessages, setShowMessages] = useState(false);
  const { data, error } = useSWR("Notification", fetcher);
  const [count, setCount] = useState();
  console.log(data);
  console.log(error);

  useEffect(() => {
    try {
      setCount(data.length);
    } catch (error) {}
  }, [data]);
  return (
    <Container fluid className="conNavbar">
      <Row>
        <Col lg={3}>
          <img src="/Image/black.webp" className="img-fluid imgLogoNav" />
        </Col>
        <Col lg={6} md={6}></Col>
        <Col lg={3} md={3}>
          <div>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic-button">
                <span className="pFname">{people[0].user.full_name}</span>
                <br></br>
                <span className="pRole">{people[0].user.roles[0]}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>My profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => {
                    localStorage.clear();
                  }}
                  href="/"
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Image fluid src="" width={35} id="imgProfile" />
            <div className="divHorizontal"></div>
            <div className="divBell" onClick={() => setShow((prev) => !prev)}>
              <div className={count ? "numberCircle" : "d-none"}>{data ? data.length : ""}</div>
              <i>
                <RiNotification3Line />
              </i>
              <Container
                className={show ? "conNotif" : "d-none"}
                onClick={(e) => e.stopPropagation()}
              >
                <Row className="align-items-center">
                  <Col lg={8}>
                    <p className="pHeader">Notifications</p>
                  </Col>
                  <Col lg={4}>
                    <i onClick={() => setShow(false)}>
                      <MdClose />
                    </i>
                  </Col>
                </Row>
                <Row className="rowNotif">
                  <Col lg={12}>
                    <ul className="ulDashboard">
                      <li
                        id="ulAppointment"
                        className={showEvents ? "activeUl" : ""}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowEvents(true);
                          setShowMessages(false);
                        }}
                      >
                        Events
                      </li>
                      <li
                        id="ulTime"
                        className={showMessages ? "activeUl" : ""}
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowMessages(true);
                          setShowEvents(false);
                        }}
                      >
                        Messages
                      </li>
                    </ul>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12}>
                    {data?.map((event, i) => (
                      <Row key={i} className="rowEvents">
                        <Col lg={7}>
                          <p className="pEventname">{event.subject}</p>
                          <p className="pTime">
                            {moment(event.date_from).format("hh:mm a")} -{" "}
                            {moment(event.date_to).format("hh:mm a")}
                          </p>
                        </Col>
                        <Col lg={5}>
                          <p className="pType">{event.event_type}</p>
                        </Col>
                      </Row>
                    ))}
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
