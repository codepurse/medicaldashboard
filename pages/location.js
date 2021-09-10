import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Search from "../components/modules/search/search";
import Location from "../components/pages/location/location";
import Business from "../components/pages/location/business";
import { useRouter } from "next/router";

export default function location() {
  const router = useRouter();
  const urlPath = router.pathname;
  const [pathUrl, setPathUrl] = useState("");
  const [showLocation, setShowlocation] = useState(false);
  const [showBuss, setShowBuss] = useState(false);
  const tab = router.asPath.split("=").pop();
  useEffect(() => {
    if (tab === "location") {
      setShowlocation(true);
      setShowBuss(false);
    } else if (tab === "business") {
      setShowBuss(true);
      setShowlocation(false);
    } else {
      setShowlocation(true);
      setShowBuss(false);
    }
  }, [router]);
  return (
    <>
      <Container fluid className="conPages">
        <Row>
          <Col lg={12} style={{ marginBottom: "20px" }}>
            <ul className="ulDashboard">
              <li
                className={showLocation ? "activeUl" : ""}
                id="ulAppointment"
                onClick={() => {
                  router.replace("/location?tabs=location");
                }}
              >
                Location
              </li>
              <li
                className={showBuss ? "activeUl" : ""}
                id="ulTime"
                onClick={() => {
                  router.replace("/location?tabs=business");
                }}
              >
                Business
              </li>
            </ul>
          </Col>
          <Search />
        </Row>
        <Row>
          <Col lg={12}>
            {(() => {
              if (showLocation) {
                return <Location />;
              } else {
                return <Business />;
              }
            })()}
          </Col>
        </Row>
      </Container>
    </>
  );
}
