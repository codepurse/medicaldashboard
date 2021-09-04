import { Container, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { useModalStore, usePatientStore } from "../../store/store";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";

export default function withSnackbar() {
  const stateShow = useModalStore((state) => state.state);
  const stateHide = useModalStore((state) => state.changeState);
  const title = useModalStore((state) => state.title);
  const message = useModalStore((state) => state.message);
  const modalPage = useModalStore((state) => state.modal);
  const changeVisible = usePatientStore((state) => state.changeVisible);
  const changeCancelPatient = usePatientStore((state) => state.changeCancelPatient);
  useEffect(() => {}, [stateShow]);

  function closeModal() {
    stateHide(false);
  }

  function discard() {
    stateHide(false); 
    changeVisible(false);
    changeCancelPatient(true);
  }

  return (
    <Modal
      size="sm"
      show={stateShow}
      onHide={closeModal}
      centered
      className="modalDelete"
    >
      <Container className="conDelete">
        <Row>
          <Col lg={12}>
            <i>
              <AiOutlineDelete />
            </i>
            <p className="pTitle">{title}</p>
            <p className="pTitlesub">{message}</p>
          </Col>
          <Col lg={6}>
            <button className="btnCancel" onClick={closeModal}>
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
    </Modal>
  );
}
