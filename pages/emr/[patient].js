import React, { Component, useState, useEffect, useRef } from "react";
import MembersInfo from "../../components/pages/Emr/memberInfo";
import { statusType, instance } from "../../utils/validation";
import MessageService from "../../services/api/api.message";
import appglobal from "../../services/api/api.services";
import { useMemberInfoStore } from "../../store/store";
import { Container, Row, Col } from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import { TiArrowBack } from "react-icons/ti";
import { RiEdit2Fill } from "react-icons/ri";
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
  const stateMemberInfo = useMemberInfoStore((state) => state.memberInfo);
  const stateMemberId = useMemberInfoStore((state) => state.memberId);
  const router = useRouter();
  const patientId = router.query.patient;
  const url = appglobal.api.base_api + appglobal.api.get_members + patientId;
  const { data, error } = useSWR(url, fetcher);
  const [memberInfo, setMemberInfo] = useState([]);
  const [familyFilter, setFamilyFilter] = useState([]);
  const [member, setMembers] = useState([]);
  var lookup = {};
  useEffect(() => {
    if (data) {
      setMembers(data);
    }
  }, [data]);

  useEffect(() => {
    if (member.length !== 0) {
      var y = member[0].clients[0].id;
      if (stateMemberInfo.length !== 0) {
        setMemberInfo(member[0].clients.filter((x) => x.id === stateMemberId));
      } else {
        setMemberInfo(member[0].clients.filter((x) => x.id === y));
        console.log(member[0].clients.filter((x) => x.id === y))
      }
    }
  }, [member]);

  function getMember() {
    console.log("asdas");
  }

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
                      console.log();
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
                  <div key={i}>
                    {event.clients.map((event, i) => (
                      <div
                        className="divList"
                        key={i}
                        onClick={() => {
                          const myArray = [];
                          myArray.push(event)
                          setMemberInfo(myArray);
                        }}
                      >
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
                            <p className="pNamelist">
                              {event.first_name + " " + event.last_name}
                            </p>
                            <p className="pRelationship">
                              {event.family_relationship}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg={8}>
          <div className="divProfilelist conLayout">
            <button
              className="btnBack"
              onClick={() => {
                window.history.back();
              }}
            >
              <TiArrowBack />
            </button>
            <button className="btnEdit">
              <RiEdit2Fill />
            </button>
            <Row>
              <Col lg={12}>
                <div className="form-inline">
                  {(() => {
                    if (memberInfo.length !== 0) {
                      try {
                        return (
                          <>
                            <Avatar
                              className="avatarProfile"
                              alt={memberInfo[0].first_name}
                              src={appglobal.api.aws + memberInfo[0].photo}
                            />
                            <div>
                              <p className="pFullname">
                                {memberInfo[0].first_name +
                                  " " +
                                  memberInfo[0].last_name}
                              </p>
                              <p className="pEmail">{memberInfo[0].email}</p>
                            </div>
                          </>
                        );
                      } catch (error) {}
                    }
                  })()}
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={12} className="colList">
                <ul className="ulDashboard">
                  <li className="activeUl" id="ulDemo">
                    Demographics
                  </li>
                  <li id="ulNotes">Notes</li>
                  <li id="ulForms">Forms</li>
                </ul>
              </Col>
            </Row>
          </div>
        <MembersInfo memberinfo={memberInfo} />
        </Col>
      </Row>
    </Container>
  );
}
