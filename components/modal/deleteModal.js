import React, { useState, useEffect, useCallback } from "react";
import MessageService from "../../services/api/api.message";
import { Container, Row, Col } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import useSWR, { mutate } from "swr";

export default function modal(props) {
  const discard = () => {
    console.log(props.mutatedata);
    if (props.type === "event") {
      MessageService.deleteEvent(props.id).then((response) => {
        props.closeModal();
        mutate(props.mutatedata);
        mutate("Notification");
      });
    } else if (props.type === "timeEntry") {
      MessageService.deleteTime(props.id).then((response) => {
        props.closeModal();
        mutate(props.mutatedata);
        mutate("TimeEntry");
      });
    } else if (props.type === "location") {
      props.action();
      mutate(props.mutatedata);
      props.closeModal();
    } else if (props.type === "business") {
      props.action();
      mutate(props.mutatedata);
      props.closeModal();
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
