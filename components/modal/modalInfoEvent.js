import { MdIndeterminateCheckBox } from "react-icons/md";
import { Container, Row, Col } from "react-bootstrap";
import { HiOutlineUserGroup } from "react-icons/hi";
import Avatar from "@material-ui/core/Avatar";
import { BsBookmarks } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { FiClock } from "react-icons/fi";
import React from "react";
export default function modalInfo(props) {
  return (
    <Container className="conInfoEvent">
      <Row>
        <Col lg={12}>
          <p className="pTitle">
            <i>
              <MdIndeterminateCheckBox />
            </i>
            {props.infoevent.subject}
          </p>
          <p className="pDate">
            {moment(props.infoevent.date_from).format("dddd LL")}
          </p>
        </Col>
        <Col lg={12}>
          <p className="pEventInfo">
            <i>
              <FiClock />
            </i>
            {moment(props.infoevent.date_from).format("LT")} -{" "}
            {moment(props.infoevent.date_to).format("LT")}
          </p>
        </Col>
        <Col lg={12}>
          <p className="pEventInfoType">
            <i>
              <BsBookmarks />
            </i>
            {props.infoevent.event_type}
          </p>
        </Col>
        <Col lg={12}>
          <p className="pEventInfo">
            <i>
              <GoLocation />
            </i>
            {props.infoevent.location}
          </p>
        </Col>
        <Col lg={12}>
          <p className="pEventInfo">
            <i>
              <HiOutlineUserGroup />
            </i>
            Participants
          </p>

          {(() => {
            try {
              return (
                <>
                  {props.infoevent.events_participants?.map((event, i) => (
                    <div
                      className="form-inline"
                      key={i}
                      style={{ marginLeft: "28px", marginTop: "-10px" }}
                    >
                      {event.clinicians.photo ? (
                        <Avatar
                          className="avatarImageEvent avatar"
                          alt="Remy Sharp"
                          src={appglobal.api.aws + event.clinicians.photo}
                        />
                      ) : (
                        <Avatar className="avatarEvent">
                          {event.clinicians.first_name.charAt(0) +
                            event.clinicians.last_name.charAt(0)}
                        </Avatar>
                      )}
                      <div>
                        <p className="pParticipants">
                          {event.clinicians.first_name}{" "}
                          {event.clinicians.last_name}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              );
            } catch (error) {
              console.log(error);
            }
          })()}
        </Col>
      </Row>
      <Row>
        <Col lg={12} className="rowCreate">
          {(() => {
            try {
              return (
                <>
                  <div className="form-inline">
                    {props.infoevent.clinicians.photo ? (
                      <Avatar
                        className="avatarImage"
                        alt="Remy Sharp"
                        src={
                          appglobal.api.aws + props.infoevent.clinicians.photo
                        }
                      />
                    ) : (
                      <Avatar className="avatar">
                        {props.infoevent.clinicians.first_name.charAt(0) +
                          props.infoevent.clinicians.last_name.charAt(0)}
                      </Avatar>
                    )}
                    <div className="divHost">
                      <p className="p1">Created by</p>
                      <p className="p2">
                        {props.infoevent.clinicians.first_name}{" "}
                        {props.infoevent.clinicians.last_name}
                      </p>
                    </div>
                  </div>
                </>
              );
            } catch (error) {
              console.log(error);
            }
          })()}
        </Col>
      </Row>
    </Container>
  );
}
