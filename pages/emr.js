import { statusType, instance, riskcategory } from "../utils/validation";
import { useMemberInfoStore, useFilterEmrStore } from "../store/store";
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
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import moment from "moment";

export default function emr() {
  const setInfo = useMemberInfoStore((state) => state.addInfo);
  const setId = useMemberInfoStore((state) => state.addMemberId);
  const filterEmr = useFilterEmrStore((state) => state.filter);
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
      setPatients(data.data);
      console.log(data);
      setPagecount(data.last_page);
    }
  }, [data]);
  const setData = (value) => {
    try {
      setPagecount(value.last_page);
      setPatients(value.data);
    } catch (error) {}
  };

  useEffect(() => {
    if (filterEmr.length !== 0) {
      console.log(filterEmr);
    }
  }, [filterEmr]);

  return (
    <>
      <Header />
      <Container fluid className="conDashboard conPages">
        <Row>
          <Search getdata={setData} />
          <Col lg={12}>
            <div className="conTable">
              <Table id="no-more-tables">
                <thead>
                  <tr onClick={() => console.log(patients)}>
                    <th>Identified Patient</th>
                    <th>Location</th>
                    <th>Admission Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {patients?.map((event, i) => (
                    <tr
                      key={i}
                      onClick={() => {
                        router.push(`/emr/${event.families.id}?tabs=demo`);
                        setInfo(event);
                        setId(event.id);
                      }}
                    >
                      <td data-title="Identifiend Patient">
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
                      <td data-title="Location">
                        {(() => {
                          try {
                            return <p>{event.families.location.name}</p>;
                          } catch (error) {
                            return <p>None</p>;
                          }
                        })()}
                      </td>
                      <td data-title="Admission Date">
                        <p>{moment(event.created_at).format("LL")}</p>
                        <p className="pDay">
                          {moment(event.admission_date).format("dddd")}
                        </p>
                      </td>
                      <td data-title="Status">
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
