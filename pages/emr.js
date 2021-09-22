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
  const [filterArray, setFilterArray] = useState([]);
  const filterEmr = useFilterEmrStore((state) => state.filter);
  const query = useFilterEmrStore((state) => state.searchQuery);
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
      setPagecount(data.meta.last_page);
    }
  }, [data]);
  const setData = (value) => {
    try {
      setPagecount(value.meta.last_page);
      setPatients(value.data);
    } catch (error) {}
  };

  function makeArray() {
    var x = 0;
    var y = 0;
    var dateFilter = "";
    var statusFilter = "";
    var locationFilter = "";
    for (var i = 0; i < filterEmr.length; i++) {
      if (filterEmr[i].label == "date") {
        dateFilter = dateFilter + `admission_date[${x}]=${filterEmr[i].value}&`;
        x = x + 1;
      } else if (filterEmr[i].label == "status") {
        statusFilter = statusFilter + `status[${y}]=${filterEmr[i].value}&`;
        y = y + 1;
      } else if (filterEmr[i].label == "location") {
        locationFilter = `location_id=${filterEmr[i].value}&`;
      }
    }
    setFilterArray(dateFilter + statusFilter + locationFilter);
  }

  useEffect(() => {
    if (filterEmr.length !== 0) {
      makeArray();
    } else {
      if (data) {
        console.log("try", filterArray);
        setPatients(data.data);
      }
    }
  }, [filterEmr]);

  useEffect(() => {
    if (filterArray.length !== 0) {
      console.log(filterArray);
      MessageService.getPatientsFilter(query, filterArray)
        .then((response) => {
          console.log(response);
          setPatients(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [filterArray]);

  return (
    <>
      <Header />
      <Container fluid className="conDashboard conPages">
        <Row>
          <Search getdata={setData} />
          <Col lg={12}>
            <div className="conTable">
              <Table
                id="no-more-tables"
                onClick={() => console.log(filterArray)}
              >
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
