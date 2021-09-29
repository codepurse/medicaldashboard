import ModalAddLocation from "../../../components/pages/location/addLocation";
import Pagination from "../../../components/modules/pagination/pagination";
import React, { Component, useState, useEffect, useRef } from "react";
import Modaldelete from "../../../components/modal/deleteModal";
import MessageService from "../../../services/api/api.message";
import { statusType, fetcher } from "../../../utils/validation";
import { useSnackStore } from "../../../store/store";
import { AiOutlineDelete } from "react-icons/ai";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { FiEdit2 } from "react-icons/fi";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
export default function locationTable(props) {
  const setSnack = useSnackStore((state) => state.changeState);
  const setSnackMessage = useSnackStore((state) => state.changeMessage);
  const setSnackStyle = useSnackStore((state) => state.changeStyle);
  const [page, setPage] = useState(1);
  const [pagecount, setPagecount] = useState(1);
  const url =
    appglobal.api.base_api + appglobal.api.get_all_location + `?&page=${page}`;
  const { data, error } = useSWR(url, fetcher);
  const router = useRouter();
  const [location, setLocation] = useState([]);
  const tab = router.asPath.split("=").pop();
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showLocation, setShowLocation] = useState(false);
  const handleCloseLocation = () => setShowLocation(false);
  const handleShowLocation = () => setShowLocation(true);
  useEffect(() => {
    if (data) {
      console.log(tab);
      console.log(data);
      setLocation(data.data);
      setPagecount(data.meta.last_page);
    }
  }, [data, tab, router]);

  useEffect(() => {
    try {
      if (props.filterlocation.length !== 0) {
        console.log("filterlocation", props.filterlocation.length);
        setLocation(props.filterlocation);
      }
    } catch (error) {}
  }, [props]);

  function goDelete() {
    const formData = new FormData();
    formData.append("business_id", selectedLocation.business_id);
    formData.append("name", selectedLocation.name);
    formData.append("city", selectedLocation.city);
    formData.append("state_name", selectedLocation.state_name);
    formData.append("county", selectedLocation.county);
    formData.append("timezone", selectedLocation.timezone);
    formData.append("status", 2);
    formData.append("_method", "PUT");
    MessageService.updateLocation(formData, selectedLocation.id)
      .then((response) => {
        mutate("LocationDirectory");
        setSnackMessage("Location sucessfully suspended.");
        setSnack(true);
        setSnackStyle(true);
      })
      .catch((error) => {
        setSnackMessage("Sorry something went wrong.");
        setSnack(true);
        setSnackStyle(false);
      });
  }

  const getPage = (value) => {
    setPage(value);
  };

  return (
    <>
      <div
        className="conTable"
        onClick={() => {
          console.log(location);
        }}
      >
        <Table responsive>
          <thead>
            <tr>
              <th>Location Name</th>
              <th>Business Name</th>
              <th>City</th>
              <th>Country</th>
              <th>State</th>
              <th>Timezone</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {location?.map((event, i) => (
              <tr key={i}>
                <td>
                  <p>{event.name}</p>
                </td>
                <td>
                  <p>{event.business.business_name}</p>
                </td>
                <td>
                  <p>{event.city}</p>
                </td>
                <td>
                  <p>{event.county}</p>
                </td>
                <td>
                  <p>{event.state_name}</p>
                </td>
                <td>
                  <p>{event.timezone}</p>
                </td>
                <td>
                  <p className={statusType(event.status)}>
                    {" "}
                    {event.status == 1 ? "Active" : "Suspend"}
                  </p>
                </td>
                <td>
                  <i
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShowLocation();
                      setSelectedLocation(event);
                    }}
                  >
                    <FiEdit2 />
                  </i>
                  <i
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLocation(event);
                      handleShow();
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
            type="location"
            mutatedata={url}
          />
        </Modal>
        <Modal
          centered
          className="modalNormal"
          closeModal={handleCloseLocation}
          show={showLocation}
        >
          <ModalAddLocation
            info={selectedLocation}
            closeModal={handleCloseLocation}
            action={true}
            mutatedata={url}
          />
        </Modal>
      </div>
      <Pagination page={getPage} mutateData={fetcher} count={pagecount} />
    </>
  );
}
