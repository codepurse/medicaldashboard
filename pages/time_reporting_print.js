import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Header from "../components/header";
import moment from "moment";

function tablereport({ cliniciansGlobal }) {
  const [timeReportingData, setTimeReportingData] = useState([]);
  const [total,setTotal] = useState(0)
  const [trigger,setTrigger] = useState(true)


  const converter = (start, end) => {

  

    // console.log(moment.duration('1:30').asHours())
    const startdate = moment(start);
    const enddate = moment(end);
    const diff = enddate.diff(startdate);
    const diffDuration = moment.duration(diff);
    const diffhours = diffDuration.hours();
    const diffmins = diffDuration.minutes();
    const diffdays = diffDuration.days();
    // console.log(diffhours)
   
    // console.log(moment.duration(`${diffhours}:${diffmins}`).asHours().toFixed(2))
    const decimaltime = moment.duration(`${diffhours}:${diffmins}`).asHours().toFixed(2)

    // if (diffdays == 0) {
    //   return `${diffhours} hour/s and ${diffmins} minute/s`;
    // } else {
    //   return `${diffdays} Day/s, ${diffhours} hour/s and ${diffmins} minute/s`;
    // }
    return(parseFloat(decimaltime))
  };

  useEffect(()=>{

    if(timeReportingData.length == 0){
    const data = localStorage.getItem("print")
    const parseData = JSON.parse(data)
    const total = localStorage.getItem("total")
    setTimeReportingData(parseData)
    setTotal(total)
    setTrigger(!trigger)
    }else{
      window.print()

    }

    
    
  },[trigger])


  return (
    <>
      <Header></Header>
      <Container fluid className="conEmrtable">
        <Row>
          <Col lg={12}>
            <Table className="tableAppointment" responsive>
              <thead>
                <tr>
                  <th>Date</th>

                  <th>Clinician</th>

                  <th>Client</th>

                  <th>Activity Type</th>

                  <th>Time Logged (Hours)</th>
                </tr>
              </thead>

              <tbody>
                {timeReportingData.map((event) => (
                  <tr>
                    <td>
                      <p className="pDate">
                        {`${moment(event.date_from).format("MM/DD/yyyy h:mm A")}`}{" "}
                      </p>{" "}
                    </td>

                    <td>
                      {" "}
                      <p className="pDate">
                        {" "}
                        {`${event.clinicians.first_name} ${event.clinicians.last_name}`}{" "}
                      </p>
                    </td>

                    <td>
                      {" "}
                      <p className="pDate">
                        {" "}
                        {`${event.clients.first_name} ${event.clients.last_name}`}
                      </p>
                    </td>

                    <td>
                      <p
                        className={
                          event.event_type == "Travel" ? "pBuss" : "pSession"
                        }
                      >
                        {`${event.activity_type}`}
                      </p>
                    </td>

                    <td>
                      <p>{converter(event.date_from, event.date_to)}</p>
                    </td>
                  </tr>
                ))}

                <tr>
                  <td></td>

                  <td></td>

                  <td></td>

                  <td></td>

                  <td>Total: {total} </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default tablereport;
