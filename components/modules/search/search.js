import ModalAddClinician from "../../../components/pages/clinician/addClinician";
import ClinicianFilter from "../../../components/modules/search/clinicianFilter";
import ModalAddLocation from "../../../components/pages/location/addLocation";
import ModalAddBusiness from "../../../components/pages/location/addBusiness";
import { searchClinician, searchEmr } from "../../../utils/dashboardSearch";
import ModalAddPatient from "../../../components/pages/Emr/addPatient";
import EmrFilter from "../../../components/modules/search/emrFIlter";
import MessageService from "../../../services/api/api.message";
import { customStyles } from "../../../utils/global";
import React, { useEffect, useState } from "react";
import { HiOutlineFilter } from "react-icons/hi";
import Header from "../../../components/header";
import Modal from "react-bootstrap/Modal";
import { GoPlus } from "react-icons/go";
import { useRouter } from "next/router";
import { Col } from "react-bootstrap";
import Select from "react-select";
import Cookies from "js-cookie";
import {
  useBussinessStore,
  useFilterEmrStore,
  useFilterClinicianStore,
} from "../../../store/store";
export default function emrSearch(props) {
  const dateToday = new Date();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const router = useRouter();
  const tab = router.asPath.split("=").pop();
  const urlPath = router.pathname;
  const [pathUrl, setPathUrl] = useState("");
  const [buttonName, setButtonName] = useState("");
  const filterEmr = useFilterEmrStore((state) => state.filter);
  const addQuery = useFilterEmrStore((state) => state.addQuery);
  const addQuery1 = useFilterClinicianStore((state) => state.addQuery);
  const bussInfo = useBussinessStore((state) => state.business);
  const [optionsBusiness, setOptionsBusiness] = useState([]);
  useEffect(() => {
    const path = urlPath.split("/")[1];
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
    setOptionsBusiness(
      bussInfo.map((event) => ({
        value: event.id,
        label: event.business_name,
      }))
    );
  }, [router]);

  useEffect(() => {
    if (bussInfo) {
      setOptionsBusiness(
        bussInfo.map((event) => ({
          value: event.id,
          label: event.business_name,
        }))
      );
    }
  }, [bussInfo]);

  const filterLocation = (id) => {
    MessageService.filterLocation(1, 15, id)
      .then((response) => {
        props.locationFilter(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Header />
      <Col lg={5} md={6} sm={9} xs={10}>
        {(() => {
          if (tab === "location") {
            return (
              <Select
                styles={customStyles}
                options={optionsBusiness}
                instanceId="1"
                onChange={(e) => {
                  filterLocation(e.value);
                }}
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
                    <span> Filter</span>
                  </button>
                  <div
                    className="dropdown-menu"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {(() => {
                      if (pathUrl === "emr") {
                        return <EmrFilter />;
                      } else if (pathUrl === "clinician_directory") {
                        return <ClinicianFilter />;
                      }
                    })()}
                  </div>
                </div>
                <input
                  type="text"
                  className={
                    pathUrl === "location" ? "d-none" : "form-control txtForm"
                  }
                  placeholder="Search by first or last name.."
                  aria-label="Text input with dropdown button"
                  onChange={(e) => {
                    pathUrl === "clinician_directory"
                      ? searchClinician(
                          Cookies.get("clinician_id"),
                          e.currentTarget.value
                        ).then(
                          (res) => props.getdata(res),
                          addQuery1(e.currentTarget.value)
                        )
                      : pathUrl === "emr"
                      ? searchEmr(e.currentTarget.value, filterEmr).then(
                          (res) => props.getdata(res),
                          addQuery(e.currentTarget.value)
                        )
                      : "";
                  }}
                />
              </div>
            );
          }
        })()}
      </Col>
      <Col lg={7} md={6} sm={3} xs={2}>
        <div className="float-right">
          <button className="btnBlue" onClick={handleShow}>
            <i>
              <GoPlus />
            </i>
            <span>{buttonName}</span>
          </button>
        </div>
      </Col>
      <Modal show={show} onHide={handleClose} centered className="modalNormal">
        {(() => {
          if (pathUrl === "emr") {
            return (
              <ModalAddPatient
                closeModal={handleClose}
                mutatedata={props.mutatedata}
              />
            );
          } else if (pathUrl === "clinician_directory") {
            return (
              <ModalAddClinician
                closeModal={handleClose}
                mutatedata={props.mutatedata}
              />
            );
          } else if (pathUrl === "location" && tab === "location") {
            return <ModalAddLocation closeModal={handleClose} />;
          } else if (pathUrl === "location" && tab === "business") {
            return <ModalAddBusiness closeModal={handleClose} />;
          }
        })()}
      </Modal>
    </>
  );
}
