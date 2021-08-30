import React from "react";
import moment from "moment";
import axios from "axios";
import Cookies from "js-cookie";

export const isEmail = (email) => {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
};

export const converter = (start, end) => {
  const startdate = moment(start);
  const enddate = moment(end);
  const diff = enddate.diff(startdate);
  const diffDuration = moment.duration(diff);
  const diffhours = diffDuration.hours();
  const diffmins = diffDuration.minutes();
  const diffdays = diffDuration.days();

  if (diffdays == 0) {
    return `${diffhours} hour/s and ${diffmins} minute/s`;
  } else {
    return `${diffdays} Day/s, ${diffhours} hour/s and ${diffmins} minute/s`;
  }
};

export const timeType = (value) => {
  switch (value) {
    case "Session":
      return "pSession";
    case "Travel":
      return "pTravel";
    case "Virtual Session":
      return "pVirtual";
    case "Phone":
      return "pPhone";
  }
};

export const permission = (value) => {
  switch (value) {
    case "Session":
      return "pSession";
    case "Company Meeting":
      return "pMeeting";
  }
};

export const statusType = (value) => {
  switch (value) {
    case 1:
      return "pActive";
    default: 
    return "pDischarge"
  }
};

// validation for axios
export const instance = axios.create({
  headers: { Authorization: "Bearer " + Cookies.get("token") },
});

