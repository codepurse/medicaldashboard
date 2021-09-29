import ModalAddBusiness from "../../../components/pages/location/addBusiness";
import Pagination from "../../../components/modules/pagination/pagination";
import React, { Component, useState, useEffect, useRef } from "react";
import Modaldelete from "../../../components/modal/deleteModal";
import MessageService from "../../../services/api/api.message";
import { statusType, fetcher } from "../../../utils/validation";
import { useSnackStore } from "../../../store/store";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2, FiPlus } from "react-icons/fi";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import useSWR, { mutate } from "swr";
export default function businessTable() {
  const setSnack = useSnackStore((state) => state.changeState);
  const setSnackMessage = useSnackStore((state) => state.changeMessage);
  const setSnackStyle = useSnackStore((state) => state.changeStyle);
  const [page, setPage] = useState(1);
  const [pagecount, setPagecount] = useState(1);
  const url =
    appglobal.api.base_api + appglobal.api.get_all_business + `?&page=${page}`;
  const { data, error } = useSWR(url, fetcher);
  const [selectedBuss, setSelectedBuss] = useState([]);
  const [show, setShow] = useState(false);
  const action = true;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showBusiness, setShowBusiness] = useState(false);
  const handleCloseBusiness = () => setShowBusiness(false);
  const handleShowBusiness = () => setShowBusiness(true);
  const [buss, setBuss] = useState([]);

  useEffect(() => {
    if (data) {
      setBuss(data.data);
      setPagecount(data.meta.last_page);
    }
  }, [data]);

  const getPage = (value) => {
    setPage(value);
  };

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
    <>
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
            {buss?.map((event, i) => (
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
            mutatedata={url}
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
        <Pagination page={getPage} mutateData={fetcher} count={pagecount} />
      </div>
    </>
  );
}
