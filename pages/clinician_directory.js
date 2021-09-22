import ViewClinician from "../components/pages/clinician/modalViewClinician";
import { useMemberInfoStore, useFilterClinicianStore } from "../store/store";
import { instance, clinicianType, statusType } from "../utils/validation";
import Pagination from "../components/modules/pagination/pagination";
const fetcher = (url) => instance.get(url).then((res) => res.data);
import Search from "../components/modules/search/search";
import MessageService from "../services/api/api.message";
import { Container, Row, Col } from "react-bootstrap";
import appglobal from "../services/api/api.services";
import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Table from "react-bootstrap/Table";
import Header from "../components/header";
import Modal from "react-bootstrap/Modal";
import { FiEdit2 } from "react-icons/fi";
import { GrView } from "react-icons/gr";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function clinician() {
  const filterClinician = useFilterClinicianStore((state) => state.filter);
  const [filterArray, setFilterArray] = useState([]);
  const [show, setShow] = useState(false);
  const query = useFilterClinicianStore((state) => state.searchQuery);
  const router = useRouter();
  const handleClose = () => {
    setShow(false);
  };
  const [page, setPage] = useState(1);
  const url =
    appglobal.api.base_api +
    appglobal.api.get_all_clinicians +
    `?&page=${page}`;
  const { data, error } = useSWR(url, fetcher);

  const handleShow = () => setShow(true);
  const [clinician, setClinician] = useState([]);
  const [pagecount, setPageCount] = useState();
  const [info, setInfo] = useState([]);
  const [action, setAction] = useState();
  useEffect(() => {
    if (data) {
      console.log(data);
      setClinician(data.data);
      setPageCount(data.meta.last_page);
    }
  }, [data, router]);

  const getPage = (value) => {
    setPage(value);
  };
  const setData = (value) => {
    try {
      setPageCount(value.meta.last_page);
      setClinician(value.data);
    } catch (error) {
      console.log(error);
    }
  };

  function makeArray() {
    var x = 0;
    var y = 0;
    var roleFilter = "";
    var statusFilter = "";
    var locationFilter = "";
    for (var i = 0; i < filterClinician.length; i++) {
      if (filterClinician[i].label == "status") {
        statusFilter =
          statusFilter + `status[${y}]=${filterClinician[i].value}&`;
        y = y + 1;
      } else if (filterClinician[i].label == "permission") {
        roleFilter = roleFilter + `role[${x}]=${filterClinician[i].value}&`;
        x = x + 1;
      } else if (filterClinician[i].label == "location") {
        locationFilter = `location[0]=${filterClinician[i].value}&`;
      }
    }
    setFilterArray(roleFilter + statusFilter + locationFilter);
  }

  useEffect(() => {
    if (filterClinician.length !== 0) {
      makeArray();
    } else {
      if (data) {
        console.log("try", filterArray);
        setClinician(data.data);
        setPage(data.meta.last_page);
      }
    }
  }, [filterClinician]);

  useEffect(() => {
    if (filterArray.length !== 0) {
      console.log(filterArray);
      MessageService.getCliniciansFilter(query, filterArray)
        .then((response) => {
          console.log(response);
          setClinician(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [filterArray]);

  return (
    <>
      <Header />
      <Container fluid className="conPages">
        <Row>
          <Search getdata={setData} url={url} />
          <Col lg={12}>
            <div className="conTable">
              <Table id="no-more-tables">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>Permission</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {clinician?.map((event, i) => (
                    <tr
                      key={i}
                      onClick={() => {
                        setInfo(event);
                        setAction(true);
                        handleShow();
                      }}
                    >
                      <td data-title="Name">
                        <div className="form-inline">
                          {event.photo ? (
                            <Avatar
                              className="avatarImage"
                              alt="Remy Sharp"
                              src={appglobal.api.aws + event.photo}
                            />
                          ) : (
                            <Avatar className="avatar">
                              {event.first_name.charAt(0) +
                                event.last_name.charAt(0)}
                            </Avatar>
                          )}
                          <div>
                            <p>{event.first_name + " " + event.last_name}</p>
                          </div>
                        </div>
                      </td>
                      <td data-title="Mobile">
                        {(() => {
                          try {
                            return (
                              <p>
                                {event.phones !== null &&
                                event.phones.length !== 0
                                  ? event.phones[0].phone_number
                                  : "No Mobile Number"}
                              </p>
                            );
                          } catch (error) {
                            return <p>None</p>;
                          }
                        })()}
                      </td>
                      <td data-title="Email">
                        {(() => {
                          try {
                            return (
                              <p> {event.user !== null && event.user.email}</p>
                            );
                          } catch (error) {
                            return <></>;
                          }
                        })()}
                      </td>
                      <td data-title="Permission">
                        {(() => {
                          try {
                            return (
                              <p
                                className={clinicianType(
                                  event.user.roles[0].name
                                )}
                              >
                                {event.user !== null &&
                                event.user.roles.length !== 0 &&
                                event.user.roles[0].name == "admin"
                                  ? "Admin"
                                  : "Clinician"}
                              </p>
                            );
                          } catch (error) {
                            return <></>;
                          }
                        })()}
                      </td>
                      <td data-title="Status">
                        {(() => {
                          try {
                            return (
                              <p className={statusType(event.status)}>
                                {event.status == 1
                                  ? "Active"
                                  : event.status == 2
                                  ? "Draft"
                                  : "Suspend"}
                              </p>
                            );
                          } catch (error) {
                            return <></>;
                          }
                        })()}
                      </td>
                      <td>
                        <i
                          onClick={(e) => {
                            e.stopPropagation();
                            setInfo(event);
                            setAction(true);
                            handleShow();
                          }}
                        >
                          <GrView />
                        </i>
                        <i
                          onClick={(e) => {
                            e.stopPropagation();
                            setInfo(event);
                            router.push(
                              `/clinician/${event.user_id}?tabs=demo`
                            );
                            console.log(event);
                            setAction(true);
                          }}
                        >
                          <FiEdit2 />
                        </i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <Pagination page={getPage} mutateData={fetcher} count={pagecount} />
          </Col>
        </Row>
      </Container>
      <Modal show={show} onHide={handleClose} centered className="modalNormal">
        <ViewClinician
          onHide={handleClose}
          action={action}
          closeModal={handleClose}
          info={info}
        />
      </Modal>
    </>
  );
}
