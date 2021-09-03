import { statusType, instance, riskcategory } from "../../utils/validation";
import React, { Component, useState, useEffect, useRef } from "react";
import Forms from "../../components/pages/Emr/forms/form.js";
import Formpatient from "../../components/pages/Emr/formPatient";
import MembersInfo from "../../components/pages/Emr/memberInfo";
import Notes from "../../components/pages/Emr/notes/notes.js";
import MessageService from "../../services/api/api.message";
import appglobal from "../../services/api/api.services";
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
  useMemberInfoStore,
  useSnackStore,
  useModalStore,
  usePatientStore,
} from "../../store/store";
import {
  customStyles,
  customStyles_error,
  options_relationship,
} from "../../utils/global";

const fetcher = (url) => instance.get(url).then((res) => res.data.data);
export default function patient() {
  const stateMemberInfo = useMemberInfoStore((state) => state.memberInfo);
  const stateMemberId = useMemberInfoStore((state) => state.memberId);
  const stateHide = useModalStore((state) => state.changeState);
  const stateVisible = usePatientStore((state) => state.visible);
  const changeVisible = usePatientStore((state) => state.changeVisible);
  const [action, setAction] = useState(); // true if add false if edit
  const [visible, setVisible] = useState(false);
  const [activitiy, setAcitivity] = useState(""); // last action made
  const router = useRouter();
  const [path, setPath] = useState("");
  const patientId = router.query.patient;
  const tab = router.query.tabs;
  const url = appglobal.api.base_api + appglobal.api.get_members + patientId; // patient id in uri
  const { data, error } = useSWR(url, fetcher);
  const [memberInfo, setMemberInfo] = useState([]);
  const [familyFilter, setFamilyFilter] = useState([]);
  const [idFilter, setIdFilter] = useState("");
  const [familyid, setFamilyId] = useState("");
  const [member, setMembers] = useState([]);
  const [profilepic, setProfilepic] = useState("");
  const [fullname, setFullname] = useState("");
  const [lastid, setLastid] = useState(); // last member click
  const [id, setId] = useState(); // id of the selected patient
  console.log(router.query);
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
        if (activitiy === "edit") {
          console.log(activitiy + " " + lastid);
          if (lastid) {
            setMemberInfo(member[0].clients.filter((x) => x.id === lastid));
          } else {
            setMemberInfo(member[0].clients.filter((x) => x.id === y));
          }
        } else if (activitiy === "add") {
          var arr = member[0].clients.slice(-1)[0];
          var idlast = arr.id;
          setMemberInfo(member[0].clients.filter((x) => x.id === idlast));
        } else {
          setMemberInfo(member[0].clients.filter((x) => x.id === y));
        }
      }
    }
  }, [member]);

  useEffect(() => {
    if (memberInfo.length !== 0) {
      setFamilyId(memberInfo[0].families_id);
      setId(memberInfo[0].id);
      setFullname(memberInfo[0].first_name + " " + memberInfo[0].last_name);
      try {
        setProfilepic(appglobal.api.aws + memberInfo[0].photo);
      } catch {}
    }
  }, [memberInfo]);

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

  function changeAction() {
    setVisible(false);
    setProfilepic(appglobal.api.aws + memberInfo[0].photo);
    setFullname(memberInfo[0].first_name + " " + memberInfo[0].last_name);
  }

  function changePhoto(val) {
    setProfilepic(val);
  }

  function changeFullname(val) {
    setFullname(val);
  }

  useEffect(() => {
    setVisible(stateVisible);
  }, [stateVisible]);

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
                      if (visible) {
                        stateHide(true);
                      } else {
                        setProfilepic("");
                        setAcitivity("add");
                        setFullname("");
                        setAction(true);
                        setVisible(true);
                        changeVisible(true);
                      }
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
                          if (visible) {
                            stateHide(true);
                          } else {
                            const myArray = [];
                            setId(event.id);
                            setLastid(event.id);
                            myArray.push(event);
                            setMemberInfo(myArray);
                          }
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
                window.history.back();
              }}
            >
              <TiArrowBack />
            </button>
            <button
              className="btnEdit"
              onClick={() => {
                console.log(tab);
                setAcitivity("edit");
                setAction(false);
                setVisible(true);
                changeVisible(true);
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
                            {profilepic ? (
                              <Avatar
                                className="avatarProfile"
                                alt=""
                                src={profilepic}
                              />
                            ) : (
                              <Avatar
                                className="avatarProfile"
                                id={riskcategory(event.risk_category)}
                              >
                                {fullname.charAt(0)}
                              </Avatar>
                            )}
                            <div>
                              <p className="pFullname">{fullname}</p>
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
                  <li
                    className={tab === "demo" ? "activeUl" : ""}
                    id="ulDemo"
                    onClick={() => {
                      router.push(`${patientId}?tabs=demo`);
                    }}
                  >
                    Demographics
                  </li>
                  <li
                    className={tab === "notes" ? "activeUl" : ""}
                    id="ulNotes"
                    onClick={() => {
                      router.push(`${patientId}?tabs=notes`);
                    }}
                  >
                    Notes
                  </li>
                  <li
                    className={tab === "forms" ? "activeUl" : ""}
                    id="ulForms"
                    onClick={() => {
                      router.push(`${patientId}?tabs=forms`);
                    }}
                  >
                    Forms
                  </li>
                </ul>
              </Col>
            </Row>
          </div>
          {(() => {
            if (tab === "demo" && visible) {
              return (
                <Formpatient
                  memberinfo={action ? "" : memberInfo}
                  action={action}
                  setAction={changeAction}
                  url={url}
                  idfamily={familyid}
                  photo={changePhoto}
                  fullname={changeFullname} // trigger if the user edit the profile picture
                />
              );
            } else if (tab === "demo" && !visible) {
              return <MembersInfo memberinfo={memberInfo} />;
            }
            if (tab === "notes") {
              return <Notes patientid={id} />;
            }
            if (tab === "forms") {
              return <Forms patientid={id} />;
            }
          })()}
        </Col>
      </Row>
    </Container>
  );
}
