import { searchClinician, searchEmr } from "../../../utils/dashboardSearch";
import appglobal from "../../../services/api/api.services";
import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { HiOutlineFilter } from "react-icons/hi";
import ModalAddPatient from "../../../components/pages/Emr/addPatient"
import Modal from "react-bootstrap/Modal";
import { GoPlus } from "react-icons/go";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";

export default function emrSearch(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();
  const urlPath = router.pathname;
  const [pathUrl, setPathUrl] = useState("");
  const [buttonName, setButtonName] = useState("");
  useEffect(() => {
    console.log(urlPath.split("/")[1]);
    const path = urlPath.split("/")[1];
    setPathUrl(path);
    if (path === "clinician_directory") {
      setButtonName("Add Clinician");
    } else if (path === "emr") {
      setButtonName("Add Patient");
    } else {
    }
  }, [urlPath]);
  return (
    <>
      <Col lg={5}>
        <div className="input-group mb-3">
          <div className="dropdownFilter input-group-prepend">
            <button
              className="btn btnFilter dropdown-toggle"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i>
                <HiOutlineFilter />
              </i>
              Filter
            </button>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
              <div role="separator" className="dropdown-divider" />
              <a className="dropdown-item" href="#">
                Separated link
              </a>
            </div>
          </div>
          <input
            type="text"
            className="form-control txtForm"
            placeholder="Search by first or last name.."
            aria-label="Text input with dropdown button"
            onChange={(e) => {
              {
                pathUrl === "clinician_directory"
                  ? searchClinician(
                      Cookies.get("clinician_id"),
                      e.currentTarget.value
                    ).then((res) => props.getdata(res))
                  : searchEmr(
                      Cookies.get("clinician_id"),
                      e.currentTarget.value
                    ).then((res) => props.getdata(res));
              }
            }}
          />
        </div>
      </Col>
      <Col lg={7}>
        <div className="float-right">
          <button className="btnBlue" onClick={handleShow}>
            <i>
              <GoPlus />
            </i>
            {buttonName}
          </button>
        </div>
      </Col>
      <Modal show={show} onHide={handleClose} centered className="modalNormal">
        <ModalAddPatient closeModal={handleClose} />
      </Modal>
    </>
  );
}
