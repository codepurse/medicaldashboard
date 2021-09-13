import { searchClinician, searchEmr } from "../../../utils/dashboardSearch";
import { Container, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { HiOutlineFilter } from "react-icons/hi";
import ModalAddPatient from "../../../components/pages/Emr/addPatient";
import Header from "../../../components/header";
import ModalAddClinician from "../../../components/pages/clinician/addClinician";
import Modal from "react-bootstrap/Modal";
import { GoPlus } from "react-icons/go";
import MessageService from "../../../services/api/api.message";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Select from "react-select";
import { useBussinessStore } from "../../../store/store";
import { customStyles } from "../../../utils/global";

export default function emrSearch(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();
  const tab = router.asPath.split("=").pop();
  const urlPath = router.pathname;
  const [pathUrl, setPathUrl] = useState("");
  const [buttonName, setButtonName] = useState("");
  const bussInfo = useBussinessStore((state) => state.business);
  const [optionsBusiness, setOptionsBusiness] = useState([]);
  const [businessid, setBusinessId] = useState();
  useEffect(() => {
    const path = urlPath.split("/")[1];
    console.log(path);
    setPathUrl(path);
    if (path === "clinician_directory") {
      setButtonName("Add Clinician");
    } else if (path === "emr") {
      setButtonName("Add Patient");
    } else if (path === "location") {
      if (tab === "location") {
        setButtonName("Add Location");
      } else {
        setButtonName("Add Business");
      }
    } else {
    }
    console.log(bussInfo);
    setOptionsBusiness(
      bussInfo.map((event) => ({
        value: event.id,
        label: event.business_name,
      }))
    );
  }, [router]);

  const filterLocation = (id) => {
    MessageService.filterLocation(1, 15, id)
      .then((response) => {
        console.log(response.data);
        setOptionsBusiness(
          response.data.map((event) => ({
            value: event.id,
            label: event.business_name,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <Col lg={5}>
        {(() => {
          if (tab === "location") {
            return (
              <Select
                styles={customStyles}
                options={optionsBusiness}
                instanceId="1"
                onChange={(e) => filterLocation(e.value)}
              />
            );
          } else {
            return (
              <div className="input-group mb-3">
                <div className="dropdownFilter input-group-prepend">
                  <button
                    className={
                      pathUrl === "location"
                        ? "d-none"
                        : "btn btnFilter dropdown-toggle"
                    }
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
            );
          }
        })()}
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
        {(() => {
          if (pathUrl === "emr") {
            return <ModalAddPatient closeModal={handleClose} />;
          } else if (pathUrl === "clinician_directory") {
            return <ModalAddClinician closeModal={handleClose} />;
          }
        })()}
      </Modal>
    </>
  );
}
