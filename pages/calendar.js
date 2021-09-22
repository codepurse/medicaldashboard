import Calendar from "../components/modules/calendar/calendar";
import Cookies from "js-cookie";
import React from "react";

export default function calendar() {
  return <Calendar id={Cookies.get("clinician_id")} user=""></Calendar>;
}
