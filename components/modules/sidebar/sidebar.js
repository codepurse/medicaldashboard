import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Analytics } from "./sidebardata";
import Link from "next/link";

export default function sidebar() {
  return (
    <Container className="divSidebar">
      <Row>
        <Col lg={12}>
          <img src="Image/logosmallblack.png" className="img-fluid imgLogo" />
          <p className="pHeader">ANALYTICS</p>
          <ul>
            {Analytics.map((item, index) => (
              <>
                <li key={index}>
                  <Link href={item.path}>
                    <div className="form-inline">
                      <i>{item.icon}</i>
                      <a>
                        <span>{item.title}</span>
                      </a>
                    </div>
                  </Link>
                </li>
              </>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
}
