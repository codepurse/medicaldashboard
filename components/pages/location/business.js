import ModalAddBusiness from "../../../components/pages/location/addBusiness";
import React, { Component, useState, useEffect, useRef } from "react";
import Modaldelete from "../../../components/modal/deleteModal";
import MessageService from "../../../services/api/api.message";
import { statusType } from "../../../utils/validation";
import { Container, Row, Col } from "react-bootstrap";
import { useSnackStore } from "../../../store/store";
import { GoSearch, GoPlus } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2, FiPlus } from "react-icons/fi";
import Header from "../../../components/header";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import useSWR, { mutate } from "swr";
import Cookies from "js-cookie";
import moment from "moment";

const fetcher = (url) =>
  MessageService.getBusiness(1).then((response) => response.data);
export default function businessTable() {
  const setSnack = useSnackStore((state) => state.changeState);
  const setSnackMessage = useSnackStore((state) => state.changeMessage);
  const setSnackStyle = useSnackStore((state) => state.changeStyle);
  const { data, error } = useSWR("BusinessDirectory", fetcher);
  const [selectedBuss, setSelectedBuss] = useState([]);
  const [show, setShow] = useState(false);
  const action = true;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showBusiness, setShowBusiness] = useState(false);
  const handleCloseBusiness = () => setShowBusiness(false);
  const handleShowBusiness = () => setShowBusiness(true);

  function goDelete() {
    const formData = new FormData();
    formData.append("business_name", selectedBuss.bussName);
    formData.append("business_address", selectedBuss.bussAdd);
    formData.append("status", 2);
    formData.append("_method", "PUT");
    MessageService.createBusiness(formData, action, selectedBuss.id)
      .then((response) => {
        mutate("BusinessDirectory");
        setSnackMessage("Business sucessfully suspended.");
        setSnack(true);
        setSnackStyle(true);
      })
      .catch((error) => {
        setSnackMessage("Something went wrong");
        setSnack(true);
        setSnackStyle(false);
      });
  }
  return (
    <div className="conTable">
      <Table responsive>
        <thead>
          <tr>
            <th>Business Name</th>
            <th>Business Address</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((event, i) => (
            <tr key={i}>
              <td>
                <p>{event.business_name}</p>
              </td>
              <td>
                <p>{event.business_address}</p>
              </td>
              <td>
                <p className={statusType(event.status)}>
                  {event.status == 1 ? "Active" : "Suspend"}
                </p>
              </td>
              <td>
                <i
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShowBusiness();
                    setSelectedBuss(event);
                  }}
                >
                  <FiEdit2 />
                </i>
                <i
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShow();
                    setSelectedBuss(event);
                  }}
                >
                  <AiOutlineDelete />
                </i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        show={show}
        onHide={handleClose}
        size="sm"
        centered
        className="modalDelete"
      >
        <Modaldelete
          closeModal={handleClose}
          action={goDelete}
          type="business"
        />
      </Modal>
      <Modal
        centered
        className="modalNormal"
        closeModal={handleCloseBusiness}
        show={showBusiness}
      >
        <ModalAddBusiness
          info={selectedBuss}
          closeModal={handleCloseBusiness}
          action={true}
        />
      </Modal>
    </div>
  );
}
