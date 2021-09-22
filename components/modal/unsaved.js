import { useModalStore, usePatientStore } from "../../store/store";
import { Container, Row, Col } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import React, {useEffect } from "react";


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
