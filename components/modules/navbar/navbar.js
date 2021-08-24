import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import {RiNotification3Line} from "react-icons/ri";

export default function navbar() {
  return (
    <Container fluid className="conNavbar">
      <Row>
        <Col lg={12}>
          <div>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic-button">
                <span className="pFname">Alfon Labadan</span>
                <br></br>
                <span className="pRole">Admin</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>My profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => {
                    localStorage.clear();
                  }}
                  href="/"
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Image fluid src={"Image/avatar.jpg"} width={35} id="imgProfile" />
            <div className="divHorizontal"></div>
            <div className="divBell">
              <div className="numberCircle"></div>
              <i><RiNotification3Line/></i>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
