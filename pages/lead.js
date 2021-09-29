import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Header from "../components/header";
import AddLead from "../components/pages/lead/addLead";
import useSWR, { mutate } from "swr";
import MessageService from "../services/api/api.message";
import appglobal from "../services/api/api.services";
import { instance } from "../utils/validation";
const fetcher = (url) => instance.get(url).then((res) => res.data);

export default function lead() {
  const [page, setPage] = useState(1);
  const url =
    appglobal.api.base_api + appglobal.api.get_all_lead + `?&page=${page}`;
  const { data, error } = useSWR(url, fetcher);
  const [lead, setLead] = useState([]);
  const [show, setShow] = useState(false);
  const handleShowLead = () => setShow(true);
  const handeCloseLead = () => setShow(false);
  mutate(url);

  useEffect(() => {
    if (data) {
      setLead(data.data);
    }

    console.log(data);
  }, [data]);

  return (
    <>
      <Header />
      <Container fluid className="conPages">
        <Button onClick={() => handleShowLead()}> Add Lead </Button>
        <Row>
          <Col lg={12}>
            <div className="conTable">
              <Table id="no-more-tables">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Due Date</th>
                    <th>Type</th>
                    <th>Lifecycle</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {lead.map((event) => (
                    <>
                      <td>event</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal
        centered
        className="modalNormal"
        closeModal={handeCloseLead}
        show={show}
      >
        <AddLead
          //   info={selectedBuss}
          closeModal={handeCloseLead}
          //   action={true}
        />
      </Modal>
    </>
  );
}
