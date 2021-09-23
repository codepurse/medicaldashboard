import React, { Component, useState, useEffect, useRef } from "react";
import { useSettingStore, useSnackStore } from "../store/store";
import MessageService from "../services/api/api.message";
import { Container, Row, Col } from "react-bootstrap";
import { isEmail } from "../utils/validation";
import Header from "../components/header";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Login() {
  const setSnack = useSnackStore((state) => state.changeState);
  const setSnackMessage = useSnackStore((state) => state.changeMessage);
  const setSnackStyle = useSnackStore((state) => state.changeStyle);
  const setInfo = useSettingStore((state) => state.addInfo);
  const [reset, setReset] = useState(false);
  const router = useRouter();
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

    if (state.email && state.password && isEmail(state.email)) {
      const formData = new FormData();
      formData.append("email", state.email);
      formData.append("password", state.password);
      MessageService.goLogin(formData)
        .then((response) => {
          Cookies.set("token", response.data.token);
          Cookies.set("clinician_id", response.data.user.clinician_id);
          Cookies.set("user_id", response.data.user.id);
          setInfo(response.data);
          router.push("/dashboard");
        })
        .catch((error) => {
          setSnackMessage("Invalid username or password.");
          setSnack(true);
          setSnackStyle(false);
        });
    }
  };

  const goReset = (evt) => {
    var clear = 0;
    if (!state.email) {
      setEmailerror(false);
      clear = 1;
    }
    if (clear === 0) {
      const formData = new FormData();
      formData.append("email", state.email);
      MessageService.goReset(formData)
        .then((response) => {
          setSnackMessage("The link was sent into your email.");
          setSnack(true);
          setSnackStyle(true);
        })
        .catch((error) => {
          setSnackMessage("Sorry something went wrong.");
          setSnack(true);
          setSnackStyle(false);
        });
    }
  };

  useEffect(() => {
    router.prefetch("/dashboard");
    router.replace("/?action=login");
  }, []);
  return (
    <>
      <Header></Header>
      <Container fluid className="conLogin">
        <img src="Image/Logo-white.png" className="img-fluid imgLogoNav" />
        <Row className="align-items-center rowLogin">
          <Col lg={6} md={4} className="colVideo">
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
            <video className="video-fluid" autoPlay loop muted>
              <source
                src="https://video.wixstatic.com/video/aa4ea1_2a58fdec77224362960c40c6d399a6ac/1080p/mp4/file.mp4"
                type="video/mp4"
              ></source>
            </video>
          </Col>
          <Col lg={6} md={8}>
            <div className="divLogin mx-auto">
              <p className="pHeader">
                {reset ? "Forgot password." : "Log in."}
              </p>
              <p className="pHeadersub">
                {reset
                  ? "Enter the email address associated with your account and we'll send you a link to reset your passwrod."
                  : "Please input all the needed credentials."}
              </p>
              <p className="pHeaderinput">Email</p>
              <input
                type="text"
                onInput={(e) => {
                  setEmailerror(true);
                }}
                className={emailError ? "txtInput" : "txtError"}
                name="email"
                onInput={(e) => {
                  pErroremail.current.style.display = "none";
                }}
                onChange={handleChange}
              />
              <p
                className="pInvalid"
                ref={pErroremail}
                style={{ marginBottom: "8px", marginTop: "5px" }}
              >
                Invalid email format.
              </p>

              <div className={reset ? "d-none" : ""}>
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
              </div>
              <p className="pInvalid" ref={goHide}>
                Invalid credentials.
              </p>
              <button className="btnLogin" onClick={reset ? goReset : goLogin}>
                {reset ? "Continue" : "Login"}
              </button>
              <p
                className="pForgot"
                onClick={() => {
                  if (!reset) {
                    router.push("/?action=reset_password");
                    setReset(true);
                  } else {
                    router.push("/?action=login");
                    setReset(false);
                  }
                }}
              >
                {reset ? "I have an account, go Login" : "Forgot Password?"}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
