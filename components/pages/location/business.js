import Header from "../../../components/header";
import React, { Component, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import useSWR, { mutate } from "swr";
import moment from "moment";
import { statusType } from "../../../utils/validation";
import Cookies from "js-cookie";
import MessageService from "../../../services/api/api.message";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2, FiPlus } from "react-icons/fi";
import { GoSearch, GoPlus } from "react-icons/go";
const fetcher = (url) =>
  MessageService.getBusiness(1).then((response) => response.data);
export default function businessTable() {
  const { data, error } = useSWR("BusinessDirectory", fetcher);
  return (
    <div className="conTable">
      <Table responsive>
        <thead>
          <tr>
            <th>Business Name</th>
            <th>Business Address</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((event, i) => (
            <tr key={i}>
              <td>
                <p>{event.business_name}</p>
              </td>
              <td>
                <p>{event.business_address}</p>
              </td>
              <td>
                <p className={statusType(event.status)}>
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
