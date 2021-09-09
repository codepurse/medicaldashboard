import React, { useEffect, useRef } from "react";
import { RiDashboardLine } from "react-icons/ri";
import { RiCalendarEventFill } from "react-icons/ri";
import { BiTimeFive } from "react-icons/bi";
import { FaLaptopMedical } from "react-icons/fa";
import { VscFileSymlinkDirectory } from "react-icons/vsc";
import { GoLocation } from "react-icons/go";


export const Analytics = [
  {
    title: "Dashboard",
    path: "/dashboard",
    id: "dashboard",
    icon: <RiDashboardLine />,
    cname: "centered-label",
  },
  {
    title: "Event Calendar",
    path: "/calendar",
    id: "calendar",
    icon: <RiCalendarEventFill />,
    cname: "centered-label",
  },
  {
    title: "Time Reporting",
    path: "/time_reporting",
    id: "time_reporting",
    icon: <BiTimeFive />,

    cname: "centered-label",
  },
];

export const Directory = [
  {
    title: "Medical Records",
    path: "/emr",
    id: "emr",
    icon: <FaLaptopMedical />,
    cname: "centered-label",
  },
  {
    title: "Clinician Directory",
    path: "/clinician_directory",
    id: "clinician_directory",
    icon: <VscFileSymlinkDirectory />,
    cname: "centered-label",
  },
  {
    title: "Location Directory",
    path: "/location?tabs=location",
    id: "location_directory",
    icon: <GoLocation />,
    cname: "centered-label",
  },
];
