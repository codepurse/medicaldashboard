import React, { Component, useState, useEffect, useLayoutEffect } from "react";
import ModalTime from "../../../components/pages/dashboard/Timemodal";
import MessageService from "../../../services/api/api.message";
import { useSettingStore } from "../../../store/store";
import { Container, Row, Col } from "react-bootstrap";
import { RiNotification3Line } from "react-icons/ri";
import Dropdown from "react-bootstrap/Dropdown";
import Avatar from "@material-ui/core/Avatar";
import { BiTimeFive } from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import { MdClose } from "react-icons/md";
import Hamburger from "hamburger-react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import moment from "moment";
import useSWR from "swr";

const fetcher = (url) =>
  MessageService.getNotif(Cookies.get("clinician_id")).then(
    (response) => response.data
  );

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}
export default function navbar() {
  const [width, height] = useWindowSize();
  var inHalfADay = 0.5;
  const router = useRouter();
  const people = useSettingStore((state) => state.people);
  const [show, setShow] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [showEvents, setShowEvents] = useState(true);
  const [showMessages, setShowMessages] = useState(false);
  const { data, error } = useSWR("Notification", fetcher);
  const [photo, setPhoto] = useState();
  const [count, setCount] = useState();
  const [showTime, setShowTime] = useState(false);
  const handleCloseTime = () => setShowTime(false);
  const handleShowTime = () => setShowTime(true);

  useEffect(() => {
    try {
      setCount(data.length);
    } catch (error) {}
  }, [data]);

  useEffect(() => {
    setPhoto(people[0].user.photo);
  }, []);

  useEffect(() => {
    if (width <= 1200) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [width]);

  useEffect(() => {
    var element = document.getElementById("divSidebar");
    if (isOpen) {
      element.setAttribute("style", "left: 0px !important");
    } else {
      element.setAttribute("style", "left: -230px !important");
    }
  }, [isOpen]);
  return (
    <Container fluid className="conNavbar">
      <Row>
        <Col lg={6} sm={3} md={6} sm={3} xs={2}>
          <div className="form-inline">
            <div className="divHamburger">
              <Hamburger toggled={isOpen} toggle={setOpen} size={20} />
            </div>
            <img src="/Image/black.webp" className="img-fluid imgLogoNav" />
          </div>
        </Col>
        <Col lg={6} md={6} sm={9} xs={10}>
          <div>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic-button">
                <span className="pFname">{people[0].user.full_name}</span>
                <br></br>
                <span className="pRole">{people[0].user.roles[0]}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => router.push("/profile")}>
                  My Profile
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => {
                    Cookies.remove("token", { expires: inHalfADay });
                  }}
                  href="/"
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {photo ? (
              <Avatar
                className="avatar"
                id="imgProfile"
                src={appglobal.api.aws + photo}
              />
            ) : (
              <Avatar className="avatar" id="imgProfile">
                {people[0].user.full_name.charAt(0)}
              </Avatar>
            )}
            <div className="divHorizontal"></div>
            <div className="divBell" onClick={() => setShow((prev) => !prev)}>
              <div className={count ? "numberCircle" : "d-none"}>
                {data ? data.length : ""}
              </div>
              <i>
                <RiNotification3Line />
              </i>
              <Container
                className={show ? "conNotif" : "d-none"}
                onClick={(e) => e.stopPropagation()}
              >
                <Row className="align-items-center">
                  <Col lg={8} md={6} sm={8} xs={8}>
                    <p className="pHeader">Notifications</p>
                  </Col>
                  <Col lg={4} md={6} sm={4} xs={4}>
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
                        <Col lg={7} md={7} sm={6} xs={6}>
                          <p className="pEventname">{event.subject}</p>
                          <p className="pTime">
                            {moment(event.date_from).format("hh:mm a")} -{" "}
                            {moment(event.date_to).format("hh:mm a")}
                          </p>
                        </Col>
                        <Col lg={5} md={5} sm={6} xs={6}>
                          <p className="pType">{event.event_type}</p>
                        </Col>
                      </Row>
                    ))}
                  </Col>
                </Row>
              </Container>
            </div>
            <button
              className="btnNav float-right"
              onClick={() => {
                handleShowTime();
              }}
            >
              <i>
                <BiTimeFive />
              </i>
              <span>Time Entry</span>
            </button>
          </div>
        </Col>
      </Row>
      <Modal
        show={showTime}
        onHide={handleCloseTime}
        centered
        className="modalNormal"
      >
        <ModalTime closeModal={handleCloseTime} />
      </Modal>
    </Container>
  );
}
