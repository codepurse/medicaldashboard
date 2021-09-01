import React, { Component, useState, useEffect, useRef } from "react";
import MessageService from "../../../services/api/api.message";
import appglobal from "../../../services/api/api.services";
import { useMemberInfoStore } from "../../../store/store";
import { Container, Row, Col } from "react-bootstrap";
import useSWR, { mutate } from "swr";
import moment from "moment";

export default function memberInfo(props) {
  return (
    <>
      <div className="divProfileInfo">
        {(() => {
          if (props.memberinfo.length !== 0) {
            return (
              <>
                <Row>
                  <Col lg={12}>
                    <p className="pTitle">Personal Information</p>
                    <hr></hr>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">First Name</p>
                    <p className="pInfo">{props.memberinfo[0].first_name}</p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Middle Name</p>
                    <p className="pInfo">{props.memberinfo[0].middle_name}</p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Last Name</p>
                    <p className="pInfo">{props.memberinfo[0].last_name}</p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Relationship Status</p>
                    <p className="pInfo">
                      {props.memberinfo[0].marital_status}
                    </p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Family Relationship</p>
                    <p className="pInfo">
                      {props.memberinfo[0].family_relationship}
                    </p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Date Of Birth</p>
                    <p className="pInfo">{props.memberinfo[0].date_of_birth}</p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Gender</p>
                    <p className="pInfo">{props.memberinfo[0].gender}</p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Social Security</p>
                    <p className="pInfo">
                      {props.memberinfo[0].social_security}
                    </p>
                    <p className="pInfoloading"></p>
                  </Col>

                  <Col lg={4}>
                    <p className="pTitlesub">Driver's License Number</p>
                    <p className="pInfo">
                      {props.memberinfo[0].license_number}
                    </p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Ethnicity</p>
                    <p className="pInfo">{props.memberinfo[0].ethnic}</p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Location</p>
                    <p className="pInfo">{props.memberinfo[0].state}</p>

                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={12}>
                    <p className="pTitle pMargin">Contact Information</p>
                    <hr></hr>
                  </Col>

                  <Col lg={8}>
                    {props.memberinfo[0].client_phones.map((event, i) => (
                      <Row key={i}>
                        <Col lg={6}>
                          <p className="pTitlesub">Phone Number</p>
                          <p className="pInfo">
                            {event.phone_number !== "null"
                              ? event.phone_number
                              : ""}
                          </p>
                          <p className="pInfoloading"></p>
                        </Col>
                        <Col lg={6}>
                          <p className="pTitlesub">Phone Type</p>
                          <p className="pInfo">
                            {event.type !== "null" ? event.type : ""}
                          </p>
                          <p className="pInfoloading"></p>
                        </Col>
                      </Row>
                    ))}
                  </Col>

                  <Col lg={4}>
                    <p className="pTitlesub">Email Address</p>
                    <p className="pInfo">{props.memberinfo[0].email}</p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Address</p>
                    <p className="pInfo">{props.memberinfo[0].address}</p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">City</p>
                    <p className="pInfo">{props.memberinfo[0].city}</p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">State</p>
                    <p className="pInfo">{props.memberinfo[0].state}</p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Zip Code</p>
                    <p className="pInfo">{props.memberinfo[0].zipcode}</p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={12}>
                    <p className="pTitle pMargin">
                      Emergency Contact Information
                    </p>
                    <hr></hr>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Contact Name</p>
                    <p className="pInfo">
                      {props.memberinfo[0].emergency_name}
                    </p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Contact Number</p>
                    <p className="pInfo">
                      {props.memberinfo[0].emergency_number}
                    </p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={12} style={{ marginTop: "15px" }}>
                    <p className="pTitle">Administration</p>
                    <hr></hr>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Status</p>
                    <p className="pInfo">
                      {event.status === 1 ? "Active" : "Discharge"}
                    </p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Admission Date</p>
                    <p className="pInfo">
                      {props.memberinfo[0].admission_date}
                    </p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Discharge Date</p>
                    <p className="pInfo">
                      {props.memberinfo[0].discharge_date}
                    </p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={12}>
                    <p className="pTitle pMargin">Referral Information</p>
                    <hr></hr>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Name</p>
                    <p className="pInfo">{props.memberinfo[0].referred_name}</p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Company</p>
                    <p className="pInfo">
                      {props.memberinfo[0].referred_company}
                    </p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Phone Number</p>
                    <p className="pInfo">
                      {props.memberinfo[0].referred_phone}
                    </p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Email</p>
                    <p className="pInfo">
                      {props.memberinfo[0].referred_email}
                    </p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={12}>
                    <p className="pTitle pMargin">Clinical Information</p>
                    <hr></hr>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Current Medication</p>
                    <p className="pInfo">
                      {props.memberinfo[0].current_medication}
                    </p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Diagnostic Code</p>
                    <p className="pInfo">
                      {props.memberinfo[0].diagnostic_code}
                    </p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Risk Category</p>
                    <p className="pInfo"></p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Insurance Plan</p>
                    <p className="pInfo">
                      {props.memberinfo[0].insurance_plan}
                    </p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Member Id</p>
                    <p className="pInfo">{props.memberinfo[0].member_id}</p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Group Number</p>
                    <p className="pInfo">{props.memberinfo[0].group_no}</p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Pharmacy Name</p>
                    <p className="pInfo">{props.memberinfo[0].pharmacy_name}</p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={4}>
                    <p className="pTitlesub">Pharmacy Contact</p>
                    <p className="pInfo">
                      {props.memberinfo[0].pharmacy_contact_person}
                    </p>
                    <p className="pInfoloading"></p>
                  </Col>

                  <Col lg={4}>
                    <p className="pTitlesub">Pharmacy Number</p>
                    <p className="pInfo">
                      {props.memberinfo[0].pharmacy_number}
                    </p>
                    <p className="pInfoloading"></p>
                  </Col>
                  <Col lg={12}>
                    <p className="pTitlesub">Pharmacy Address</p>
                    <p className="pInfo" style={{ wordBreak: "break-all" }}>
                      {props.memberinfo[0].pharmacy_address}
                    </p>
                    <p className="pInfoloading"></p>
                  </Col>
                </Row>
              </>
            );
          }
        })()}
      </div>
    </>
  );
}
