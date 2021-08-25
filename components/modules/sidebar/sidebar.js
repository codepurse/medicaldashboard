import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Analytics, Directory } from "./sidebardata";
import Link from "next/link";

export default function sidebar() {
  return (
    <Container className="divSidebar">
      <Row>
        <Col lg={12}>
          <img src="Image/Logo-white.png" className="img-fluid imgLogo" />
        </Col>
        <Col lg={12} className="colUl">
          <p className="pHeader">ANALYTICS</p>
          <ul>
            {Analytics.map((item, index) => (
              <Link key={index} href={item.path}>
                <li>
                  <div className="centered-label">
                    <i> {item.icon}</i>
                    <span>{item.title}</span>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </Col>
        <Col lg={12} className="colUl">
          <p className="pHeader">DIRECTORY</p>
          <ul>
            {Directory.map((item, index) => (
              <Link key={index} href={item.path}>
                <li key={index}>
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
