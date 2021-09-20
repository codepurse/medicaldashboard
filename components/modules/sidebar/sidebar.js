import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Analytics, Directory } from "./sidebardata";
import Link from "next/link";
import { useRouter } from "next/router";

export default function sidebar() {
  const router = useRouter();

  const urlPath = router.pathname;
  const [pathUrl, setPathUrl] = useState("");
  useEffect(() => {
    console.log(urlPath.split("/")[1]);
    setPathUrl(urlPath.split("/")[1]);
  }, [urlPath]);
  return (
    <Container className="divSidebar">
      <Row>
        <Col lg={12} className="colUl" style={{ marginTop: "0px" }}>
          <p className="pHeader">ANALYTICS</p>
          <ul>
            {Analytics.map((item, index) => (
              <Link key={index} href={item.path}>
                <li className={pathUrl === item.id ? "activeSide" : ""}>
                  <div className="centered-label">
                    <i> {item.icon}</i>
                    <span>{item.title}</span>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </Col>
        <Col lg={12} className="colUl" style={{ marginTop: "-10px" }}>
          <p className="pHeader">DIRECTORY</p>
          <ul>
            {Directory.map((item, index) => (
              <Link key={index} href={item.path}>
                <li
                  key={index}
                  className={pathUrl === item.id ? "activeSide" : ""}
                >
                  <div className="centered-label">
                    <i> {item.icon}</i>
                    <span>{item.title}</span>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
}
