import React, { Component, useState, useEffect, useRef } from "react";
import Table from "react-bootstrap/Table";
import useSWR, { mutate } from "swr";
import { statusType } from "../../../utils/validation";
import MessageService from "../../../services/api/api.message";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useRouter } from "next/router";
const fetcher = (url) =>
  MessageService.getLocation(1).then((response) => response.data);
export default function locationTable(props) {
  const { data, error } = useSWR("LocationDirectory", fetcher);
  const router = useRouter();
  const [location, setLocation] = useState([]);
  useEffect(() => {
    setLocation(data);
  }, [data,router]);

  useEffect(() => {
    setLocation(props.filterlocation);
  }, [props]);

  return (
    <div className="conTable">
      <Table responsive>
        <thead>
          <tr>
            <th>Location Name</th>
            <th>Business Name</th>
            <th>City</th>
            <th>Country</th>
            <th>State</th>
            <th>Timezone</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {location?.map((event, i) => (
            <tr key={i}>
              <td>
                <p>{event.name}</p>
              </td>
              <td>
                <p>{event.business.business_name}</p>
              </td>
              <td>
                <p>{event.city}</p>
              </td>
              <td>
                <p>{event.county}</p>
              </td>
              <td>
                <p>{event.state_name}</p>
              </td>
              <td>
                <p>{event.timezone}</p>
              </td>
              <td>
                <p className={statusType(event.status)}>
                  {" "}
                  {event.status == 1 ? "Active" : "Suspend"}
                </p>
              </td>
              <td>
                <i
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <FiEdit2 />
                </i>
                <i
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <AiOutlineDelete />
                </i>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
