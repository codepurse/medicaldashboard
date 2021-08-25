import React from "react";
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
    icon: <RiDashboardLine />,
    cname: "nav-text",
  },
  {
    title: "Event Calendar",
    path: "/dashboard",
    icon: <RiCalendarEventFill />,
    cname: "nav-text",
  },
  {
    title: "Time Reporting",
    path: "/dashboard",
    icon: <BiTimeFive />,
    cname: "nav-text",
  },
];

export const Directory = [
  {
    title: "Medical Records",
    path: "/emr",
    icon: <FaLaptopMedical />,
    cname: "nav-text",
  },
  {
    title: "Clinician Directory",
    path: "/dashboard",
    icon: <VscFileSymlinkDirectory />,
    cname: "nav-text",
  },
  {
    title: "Location Directory",
    path: "/dashboard",
    icon: <GoLocation />,
    cname: "nav-text",
  },
];
