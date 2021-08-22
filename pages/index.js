import Header from "../components/header";
import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
export default function Login() {
  return (
    <>
      <Header></Header>
      <Container fluid className="conLogin">
        <img src="Image/Logo-white.png" className="img-fluid" />
        <Row className="align-items-center rowLogin">
          <Col lg={6} className="colVideo">
            <video className="video-fluid" autoPlay loop muted>
              <source
                src="https://video.wixstatic.com/video/aa4ea1_2a58fdec77224362960c40c6d399a6ac/1080p/mp4/file.mp4"
                type="video/mp4"
              ></source>
            </video>
            <div className="bgOverlay align-items-center">
              <div className="childOverlay mx-auto">
                <p className = "pOverlayHeader">Welcome to <br/>resurface hub</p>
                <p className = "pOverlayHeadersub">A powerful and alternative approach to healing mental illness and substance abuse.</p>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div className="divLogin mx-auto">
              <p className="pHeader">Log in.</p>
              <p className="pHeadersub">
                Please input all the needed credentials.
              </p>
              <p className="pHeaderinput">Email</p>
              <input type="text" className="txtInput" />
              <p className="pHeaderinput">Password</p>
              <input type="password" className="txtInput" />
              <button className="btnLogin">Login</button>
              <p className="pForgot">Forgot Password?</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
