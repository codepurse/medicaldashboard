import Header from "../components/header";
import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import MessageService from "../services/api/api.message";
import { isEmail, haha } from "../utils/validation";

export default function Login() {
  const goHide = useRef();
  const pErroremail = useRef(0);
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailerror] = useState(true);
  const [passwordError, setPassworderror] = useState(true);

  const handleChange = (evt) => {
    goHide.current.style.display = "none";
    setState({
      ...state,
      [evt.target.name]: evt.target.value,
    });
  };



  const goLogin = (evt) => {
    if (!state.email) {
      setEmailerror(false);
    }
    if (!state.password) {
      setPassworderror(false);
    }
    if (!isEmail(state.email)) {
      setEmailerror(false);
      pErroremail.current.style.display = "block";
    }

    if (state.email && state.password && !isEmail(state.email)) {
      const formData = new FormData();
      formData.append("email", state.email);
      formData.append("password", state.password);
      MessageService.goLogin(formData)
        .then((response) => {
          console.log("login", response.data);
          localStorage.setItem("token", response.data.token);
          alert("tama");
        })
        .catch((error) => {
          console.log("login", error);
          goHide.current.style.display = "block";
        });
    }
  };

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
                <p className="pOverlayHeader">
                  Welcome to <br />
                  resurface hub
                </p>
                <p className="pOverlayHeadersub">
                  A powerful and alternative approach to healing mental illness
                  and substance abuse.
                </p>
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
              <input
                type="text"
                onInput={(e) => {
                  setEmailerror(true);
                }}
                className={emailError ? "txtInput" : "txtError"}
                name="email txtEmail"
                  onInput={(e) => {
                  pErroremail.current.style.display = "none";
                }}
                onChange={handleChange}
              />
              <p className="pInvalid" ref={pErroremail} style = {{marginBottom: "8px",marginTop: "5px"}}>
                Invalid email format.
              </p>
              <p className="pHeaderinput">Password</p>
              <input
                type="password"
                className={passwordError ? "txtInput" : "txtError"}
                name="password"
                onInput={(e) => {
                  setPassworderror(true);
                }}
                onChange={handleChange}
              />
              <p className="pInvalid" ref={goHide}>
                Invalid credentials.
              </p>
              <button className="btnLogin" onClick={goLogin}>
                Login
              </button>
              <p className="pForgot">Forgot Password?</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
