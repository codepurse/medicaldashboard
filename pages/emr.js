import { statusType, instance, riskcategory } from "../utils/validation";
import React, { Component, useState, useEffect, useRef } from "react";
import Pagination from "../components/modules/pagination/pagination";
const fetcher = (url) => instance.get(url).then((res) => res.data);
import MessageService from "../services/api/api.message";
import Search from "../components/pages/Emr/emrSearch";
import { Container, Row, Col } from "react-bootstrap";
import appglobal from "../services/api/api.services";
import { useMemberInfoStore } from "../store/store";
import Avatar from "@material-ui/core/Avatar";
import Table from "react-bootstrap/Table";
import Header from "../components/header";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import Cookies from "js-cookie";
import moment from "moment";
import axios from "axios";

export default function emr() {
  const setInfo = useMemberInfoStore((state) => state.addInfo);
  const setId = useMemberInfoStore((state) => state.addMemberId);
  const [page, setPage] = useState(1);
  const { data, error } = useSWR(
    appglobal.api.base_api +
      appglobal.api.get_all_identified_patient +
      `?&page=${page}`,
    fetcher
  );
  const [pagecount, setPagecount] = useState(1);
  const [patients, setPatients] = useState([]);
  const router = useRouter();
  const getPage = (value) => {
    setPage(value);
  };
  useEffect(() => {
    if (data) {
      setPatients(data);
      console.log(data);
      setPagecount(data.last_page);
    }
  }, [data]);
  const setData = (value) => {
    try {
      setPagecount(value.last_page);
      setPatients(value);
    } catch (error) {}
  };
  return (
    <>
      <Header />
      <Container fluid className="conDashboard conPages">
        <Row>
          <Search getdata={setData} />
          <Col lg={12}>
            <div className="conTable">
              <Table>
                <thead>
                  <tr>
                    <th>Identified Patient</th>
                    <th>Location</th>
                    <th>Admission Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.data?.map((event, i) => (
                    <tr
                      key={i}
                      onClick={() => {
                        router.push(`/emr/${event.families.id}`);
                        setInfo(event);
                        setId(event.id);
                      }}
                    >
                      <td>
                        <div className="form-inline">
                          {event.photo ? (
                            <Avatar
                              className="avatarImage"
                              id={riskcategory(event.risk_category)}
                              alt="Remy Sharp"
                              src={appglobal.api.aws + event.photo}
                            />
                          ) : (
                            <Avatar
                              className="avatar"
                              id={riskcategory(event.risk_category)}
                            >
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
                            return <p>{event.families.location.name}</p>;
                          } catch (error) {
                            return <p>None</p>;
                          }
                        })()}
                      </td>
                      <td>
                        <p>{moment(event.created_at).format("LL")}</p>
                        <p className="pDay">
                          {moment(event.admission_date).format("dddd")}
                        </p>
                      </td>
                      <td>
                        <p className={statusType(event.status)}>
                          {event.status == 1 ? "Active" : "Discharged"}
                        </p>
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
    </>
  );
}
