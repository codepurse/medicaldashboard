import { statusType, instance, riskcategory } from "../../utils/validation";
import React, { Component, useState, useEffect, useRef } from "react";
import MembersInfo from "../../components/pages/Emr/memberInfo";
import Formpatient from "../../components/pages/Emr/formPatient";
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
  const [action, setAction] = useState(true);
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const patientId = router.query.patient;
  const url = appglobal.api.base_api + appglobal.api.get_members + patientId;
  const { data, error } = useSWR(url, fetcher);
  const [memberInfo, setMemberInfo] = useState([]);
  const [familyFilter, setFamilyFilter] = useState([]);
  const [idFilter, setIdFilter] = useState("");
  const [member, setMembers] = useState([]);
  useEffect(() => {
    if (data) {
      console.log(data);
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
      }
    }
  }, [member]);

  function changeFilter(e) {
    setFamilyFilter({ value: e.value, label: e.label });
    setIdFilter(e.value);
    var filter = e.value.split(" ").join("_");
    if (filter === "All_Member") {
      for (let el of document.querySelectorAll(".divList"))
        el.style.display = "block";
    } else {
      for (let el of document.querySelectorAll(".divList"))
        el.style.display = "block";
      $(`.divList:not([data-relationship=${filter}])`).hide();
    }
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
                  onChange={changeFilter}
                />
              </Col>
              <Col lg={4}>
                <div className="form-inline float-right">
                  <button
                    className="btnAdd"
                    onClick={() => {
                      setAction(true);
                      setVisible(true);
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
                        data-relationship={
                          event.family_relationship
                            ? event.family_relationship.split(" ").join("_")
                            : null
                        }
                        key={i}
                        onClick={() => {
                          const myArray = [];
                          myArray.push(event);
                          setMemberInfo(myArray);
                        }}
                      >
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
                setAction(false);
                console.log(action);
              }}
            >
              <TiArrowBack />
            </button>
            <button
              className="btnEdit"
              onClick={() => {
                setAction(false);
                setVisible(true);
                console.log("asds");
              }}
            >
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
                            {memberInfo[0].photo ? (
                              <Avatar
                                className="avatarProfile"
                                alt={memberInfo[0].first_name}
                                src={appglobal.api.aws + memberInfo[0].photo}
                              />
                            ) : (
                              <Avatar
                                className="avatarProfile"
                                id={riskcategory(event.risk_category)}
                              >
                                {memberInfo[0].first_name.charAt(0) +
                                  memberInfo[0].last_name.charAt(0)}
                              </Avatar>
                            )}
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

          {(() => {
            if (visible) {
              return (
                <Formpatient
                  memberinfo={action ? "" : memberInfo}
                  action={action}
                />
              );
            } else {
              return <MembersInfo memberinfo={memberInfo} />;
            }
          })()}
        </Col>
      </Row>
    </Container>
  );
}
