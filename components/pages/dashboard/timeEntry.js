import Pagination from "../../../components/modules/pagination/pagination";
import { searchTable, searchTime } from "../../../utils/dashboardSearch";
import { converter, timeType, instance } from "../../../utils/validation";
import React, { Component, useState, useEffect, useRef } from "react";
import ModalTime from "../../../components/pages/dashboard/Timemodal";
const fetcher = (url) => instance.get(url).then((res) => res.data);
import Modaldelete from "../../../components/modal/deleteModal";
import { Container, Row, Col } from "react-bootstrap";
import { useTimeStore } from "../../../store/store";
import { GoSearch, GoPlus } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2, FiPlus } from "react-icons/fi";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie";
import moment from "moment";
import useSWR from "swr";

export default function appointment() {
  const id1 = Cookies.get("clinician_id");
  const setInfo = useTimeStore((state) => state.addInfo);
  const [page, setPage] = useState(1);
  const [pagecount, setPagecount] = useState(1);
  const [search, setSearch] = useState(null);
  const setAction = useTimeStore((state) => state.addAction);
  const { data, error } = useSWR(
    !search
      ? appglobal.api.base_api +
          appglobal.api.get_all_time_entries +
          "?clinician_id=" +
          `${id1}&page=${page}&q=${search}`
      : null,
    fetcher
  );
  const [timeentry, setTimeentry] = useState([]);
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showTime, setShowTime] = useState(false);
  const handleCloseTime = () => setShowTime(false);
  const handleShowTime = () => setShowTime(true);

  useEffect(() => {
    if (data) {
      setTimeentry(data.data);
      setPagecount(data.meta.last_page);
    }
  }, [data]);
  const getPage = (value) => {
    console.log(value);
    setPage(value);
  };

  useEffect(() => {
  }, [page]);

  return (
    <>
      <Container fluid className="conAppointment p-0">
        <Row>
          <Col lg={12} className="p-3 ">
            <Row>
              <Col lg={4} md={9} sm={8} xs={10}>
                <br />
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      <i>
                        <GoSearch />
                      </i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control txtInput"
                    placeholder="Search time entry.."
                    onChange={(e) => {
                      setSearch(e.currentTarget.value);
                      setPagecount(res.meta.last_page);
                      searchTime(
                        Cookies.get("clinician_id"),
                        e.currentTarget.value
                      ).then((res) => setTimeentry(res));
                    }}
                  />
                </div>
              </Col>
              <Col lg={8} md={3} sm={4} xs={2} className="align-self-center">
                <button
                  className="btnBlue float-right "
                  onClick={() => {
                    handleShowTime();
                  }}
                >
                  <i>
                    <GoPlus />
                  </i>
                  <span> New Time Entry</span>
                </button>
              </Col>
            </Row>
            <div className="conTable" id="no-more-tables">
              <Table className="table-condensed cf">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Clients</th>
                    <th>Activity Type</th>
                    <th>Duration</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {timeentry
                    ? timeentry.map((event, i) => (
                        <tr key={i}>
                          <td data-title="Date">
                            <p className="pDate">
                              {moment(event.date_from).format("MMMM do, YYYY")}
                            </p>
                            <p className="pDay">
                              {moment(event.date_from).format("dddd")}
                            </p>
                          </td>
                          <td data-title="Clients">
                            <p>
                              {event.clients.first_name}{" "}
                              {event.clients.last_name}
                            </p>
                          </td>
                          <td data-title="Activity Type">
                            <p className={timeType(event.activity_type)}>
                              {event.activity_type}
                            </p>
                          </td>
                          <td data-title="Duration">
                            <p>{converter(event.date_from, event.date_to)}</p>
                          </td>
                          <td>
                            <i
                              onClick={() => {
                                setInfo(event);
                                setAction("Edit");
                                handleShowTime();
                              }}
                            >
                              <FiEdit2 />
                            </i>
                            <i
                              onClick={() => {
                                handleShow();
                                setId(event.id);
                              }}
                            >
                              <AiOutlineDelete />
                            </i>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </Table>
            </div>
            <Pagination page={getPage} mutateData={fetcher} count={pagecount} />
          </Col>
        </Row>
      </Container>
      <Modal
        show={show}
        onHide={handleClose}
        size="sm"
        centered
        className="modalDelete"
      >
        <Modaldelete
          closeModal={handleClose}
          id={id}
          type="timeEntry"
          mutatedata={fetcher}
        />
      </Modal>
      <Modal
        show={showTime}
        onHide={handleCloseTime}
        centered
        className="modalNormal"
      >
        <ModalTime closeModal={handleCloseTime} />
      </Modal>
    </>
  );
}
