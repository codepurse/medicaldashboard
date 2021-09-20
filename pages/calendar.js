import React, { useState, useEffect } from "react";
import Calendar from "../components/modules/calendar/calendar";
import Cookies from "js-cookie";
export default function calendar() {
  return <Calendar id={Cookies.get("clinician_id")} user=""></Calendar>;
}
