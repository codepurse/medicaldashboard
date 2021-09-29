import Cookies from "js-cookie";
import moment from "moment";
import axios from "axios";

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

export const hourstominsConverter = (hour) => {
  let convertTime = moment.duration(hour, "hours");
  let convertHours = convertTime.hours();
  let convertMins = convertTime.minutes();
  let hourToMins = convertHours * 60;
  let total = convertMins + hourToMins;
  return total;
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
      return "pDischarge";
  }
};

export const clinicianType = (value) => {
  switch (value) {
    case "clinician":
      return "pClinician";
    default:
      return "pAdmin";
  }
};

// validation for axios
export const instance = axios.create({
  headers: { Authorization: "Bearer " + Cookies.get("token") },
});

export const riskcategory = (value) => {
  switch (value) {
    case 1:
      return "Low";
    case 2:
      return "Medium";
    case 3:
      return "High";
    default:
      return "Norisk";
  }
};

export const fetcher = (url, token) =>
  axios
    .get(url, {
      headers: { Authorization: "Bearer " + Cookies.get("token") },
    })
    .then((res) => res.data);
