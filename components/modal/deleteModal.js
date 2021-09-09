import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { AiOutlineDelete } from "react-icons/ai";
import MessageService from "../../services/api/api.message";
import useSWR, { mutate } from "swr";

export default function modal(props) {
  const discard = () => {
    if (props.type === "event") {
      MessageService.deleteEvent(props.id).then((response) => {
        props.closeModal();
        mutate("Appointment");
        mutate("Notification")
      });
    } else {
      MessageService.deleteTime(props.id).then((response) => {
        props.closeModal();
        mutate("TimeEntry");
      });
    }
  };

  return (
    <>
      <Container className="conDelete">
        <Row>
          <Col lg={12}>
            <i>
              <AiOutlineDelete />
            </i>
            <p className="pTitle">Are you sure?</p>
            <p className="pTitlesub">
              You are going to delete a {props.type}. please confirm.
            </p>
          </Col>
          <Col lg={6}>
            <button className="btnCancel" onClick={props.closeModal}>
              Cancel
            </button>
          </Col>
          <Col lg={6}>
            <button className="btnDiscard" onClick={discard}>
              Discard
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
