import { datePickerDefaultProps } from "@material-ui/pickers/constants/prop-types";
import React, { useState, useEffect, useCallback } from "react";
import { MdIndeterminateCheckBox } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { BsBookmarks } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { HiOutlineUserGroup } from "react-icons/hi";
import Avatar from "@material-ui/core/Avatar";
import { Container, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export default function modalInfo(props) {
  useEffect(() => {
    console.log(props);
  }, [props]);
  return (
    <Container className="conInfoEvent">
      <Row>
        <Col lg={12}>
          <p className="pTitle">
            <i>
              <MdIndeterminateCheckBox />
            </i>
            {props.infoevent.subject}
          </p>
          <p className="pDate">
            {moment(props.infoevent.date_from).format("dddd LL")}
          </p>
        </Col>
        <Col lg={12}>
          <p className="pEventInfo">
            <i>
              <FiClock />
            </i>
            {moment(props.infoevent.date_from).format("LT")} -{" "}
            {moment(props.infoevent.date_to).format("LT")}
          </p>
        </Col>
        <Col lg={12}>
          <p className="pEventInfoType">
            <i>
              <BsBookmarks />
            </i>
            {props.infoevent.event_type}
          </p>
        </Col>
        <Col lg={12}>
          <p className="pEventInfo">
            <i>
              <GoLocation />
            </i>
            {props.infoevent.location}
          </p>
        </Col>
        <Col lg={12}>
          <p className="pEventInfo">
            <i>
              <HiOutlineUserGroup />
            </i>
            Participants
          </p>
          <p className="pEventInfo">
            {props.infoevent.events_participants?.map((event, i) => (
              <label key={i}>
                {event.clinicians.first_name} {event.clinicians.last_name}
              </label>
            ))}
          </p>
        </Col>
      </Row>
      <Row>
        <Col lg={12} className="rowCreate">
          {(() => {
            try {
              return (
                <>
                  <div className="form-inline">
                    {props.infoevent.clinicians.photo ? (
                      <Avatar
                        className="avatarImage"
                        alt="Remy Sharp"
                        src={
                          appglobal.api.aws + props.infoevent.clinicians.photo
                        }
                      />
                    ) : (
                      <Avatar className="avatar">
                        {props.infoevent.clinicians.first_name.charAt(0) +
                          props.infoevent.clinicians.last_name.charAt(0)}
                      </Avatar>
                    )}
                    <div className="divHost">
                      <p className="p1">Created by</p>
                      <p className="p2">
                        {props.infoevent.clinicians.first_name}{" "}
                        {props.infoevent.clinicians.last_name}
                      </p>
                    </div>
                  </div>
                </>
              );
            } catch (error) {
              console.log(error);
            }
          })()}
        </Col>
      </Row>
    </Container>
  );
}
