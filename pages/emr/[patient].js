import React, { Component, useState, useEffect, useRef } from "react";
import { statusType, instance } from "../../utils/validation";
import MessageService from "../../services/api/api.message";
import { Container, Row, Col } from "react-bootstrap";
import appglobal from "../../services/api/api.services";
import Avatar from "@material-ui/core/Avatar";
import Modal from "react-bootstrap/Modal";
import { useRouter } from "next/router";
import { GoPlus } from "react-icons/go";
import useSWR, { mutate } from "swr";
import Select from "react-select";
import Cookies from "js-cookie";
import moment from "moment";
import axios from "axios";
import {
  customStyles,
  customStyles_error,
  options_relationship,
} from "../../utils/global";

const fetcher = (url) => instance.get(url).then((res) => res.data.data);
export default function patient() {
  const router = useRouter();
  const patientId = router.query.patient;
  const url = appglobal.api.base_api + appglobal.api.get_members + patientId;
  const { data, error } = useSWR(url, fetcher);
  const [familyFilter, setFamilyFilter] = useState([]);
  console.log(error);
  console.log(data);
  const [member, setMembers] = useState([]);

  useEffect(() => {
    if (data) {
      setMembers(data);
    }
  }, [data]);

  return (
    <Container fluid className="conPages">
      <Row>
        <Col lg={4}>
          <div className="divMembers conLayout">
            <Row className="align-items-center">
              <Col lg={12}>
                <label className="pHeader">System Members</label>
              </Col>
              <Col lg={8}>
                <Select
                  options={options_relationship}
                  styles={customStyles}
                  value={familyFilter}
                  instanceId="1"
                  onChange={(e) => {
                    setFamilyFilter({ value: e.value, label: e.label });
                  }}
                />
              </Col>
              <Col lg={4}>
                <div className="form-inline float-right">
                  <button
                    className="btnAdd"
                    onClick={() => {
                      console.log(member);
                    }}
                  >
                    <i>
                      <GoPlus />
                    </i>
                  </button>
                </div>
              </Col>
              <Col lg={12}>
                <hr />
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                {member?.map((event, i) => (
                  <>
                    <div className="divList">
                      <div className="form-inline">
                        <Avatar className="avatar">
                          {event.clients[i].first_name.charAt(0)}
                        </Avatar>
                      </div>
                    </div>
                  </>
                ))}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
