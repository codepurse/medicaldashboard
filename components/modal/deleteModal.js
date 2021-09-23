import React, { useState, useEffect, useCallback } from "react";
import MessageService from "../../services/api/api.message";
import { Container, Row, Col } from "react-bootstrap";
import { useSnackStore } from "../../store/store";
import { AiOutlineDelete } from "react-icons/ai";
import { useRouter } from "next/router";

export default function modal(props) {
  const router = useRouter();
  const setSnack = useSnackStore((state) => state.changeState);
  const setSnackMessage = useSnackStore((state) => state.changeMessage);
  const setSnackStyle = useSnackStore((state) => state.changeStyle);
  const [action, setAction] = useState("");
  const discard = () => {
    if (props.type === "event") {
      MessageService.deleteEvent(props.id).then((response) => {
        props.closeModal();
        mutate("Appointment");
        mutate("Notification");
      });
    } else if (props.type === "timeEntry") {
      MessageService.deleteTime(props.id).then((response) => {
        props.closeModal();
        mutate("TimeEntry");
      });
    } else if (props.type === "location") {
      props.action();
      props.closeModal();
    } else if (props.type === "business") {
      props.action();
      props.closeModal();
    } else if (props.type === "clinician") {
      const formData = new FormData();
      if (props.statususer === 1) {
        formData.append("status", "3");
      } else {
        formData.append("status", "1");
      }
      formData.append(`user_ids[${props.id}]`, props.id);
      MessageService.changeStatusClinician(formData).then((response) => {
        if (props.statususer === 1) {
          setSnackMessage("Clinician sucessfully suspended.");
        } else {
          setSnackMessage("Clinician sucessfully activated.");
        }
        setSnack(true);
        setSnackStyle(true);
        router.push("/clinician_directory");
      });
    }
  };

  useEffect(() => {
   if (props.type === "clinician") {
     if (props.statususer === 1) {
       setAction("suspend");
     }else {
       setAction("activate");
     }
   }else {
     setAction("delete")
   }
  }, [])

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
              You are going to {action} a {props.type}. please confirm.
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
