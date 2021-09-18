import { instance, clinicianType, statusType } from "../utils/validation";
import React, { useState, useEffect } from "react";
import Pagination from "../components/modules/pagination/pagination";
const fetcher = (url) => instance.get(url).then((res) => res.data);
import { Container, Row, Col } from "react-bootstrap";
import appglobal from "../services/api/api.services";
import MessageService from "../services/api/api.message";
import Avatar from "@material-ui/core/Avatar";
import Table from "react-bootstrap/Table";
import Header from "../components/header";
import ViewClinician from "../components/pages/clinician/modalViewClinician";
import Search from "../components/modules/search/search";
import { GrView } from "react-icons/gr";
import { FiEdit2 } from "react-icons/fi";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/router";
import useSWR from "swr";

export async function getServerSideProps(context) {
  const cookieSWR = context.req.cookies["token"];
  const dataSSR = await MessageService.getCliniciansSSR(cookieSWR).then(
    (response) => response.data
  );
  return {
    props: {
      results: JSON.parse(JSON.stringify(dataSSR)),
    },
  };
}

export default function clinician() {
  const [show, setShow] = useState(false);
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
  const [selectedClinician, setSelectedClinician] = useState([]);

  console.log(data);
  console.log(error);

  useEffect(() => {
    if (data) {
      setClinician(data);
      setPageCount(data.last_page);
    }
  }, [data]);

  const getPage = (value) => {
    setPage(value);
  };
  const setData = (value) => {
    try {
      setPageCount(value.last_page);
      setClinician(value);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Container fluid className="conPages">
        <Row>
          <Search getdata={setData} url={url} />
          <Col lg={12}>
            <div className="conTable">
              <Table responsive>
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
                  {clinician.data?.map((event, i) => (
                    <tr
                      key={i}
                      onClick={() => {
                        router.push(`/clinician/${event.user_id}?tabs=demo`);
                        console.log(event);
                        setAction(true);
                      }}
                    >
                      <td>
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
                      <td>
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
                      <td>
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
                      <td>
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
                      <td>
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
