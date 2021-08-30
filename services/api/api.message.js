import request from "../../services/api/api.request";
import appglobal from "../../services/api/api.services";
import Cookies from "js-cookie";

function goLogin(data) {
  return request({
    url: appglobal.api.login,
    method: "POST",
    data: data,
  });
}

function getEvents(id) {
  return request({
    url: appglobal.api.get_events + "?clinician_id=" + `${id}`,
    method: "GET",
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
      xsrfCookieName: "token",
      xsrfHeaderName: "X-XSRF-TOKEN",
      withCredentials: true,
    },
  });
}

function createEvent(data, action, id) {
  return request({
    url:
      action === "Edit"
        ? appglobal.api.update_event + id
        : appglobal.api.add_event,
    method: "POST",
    data: data,
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
      xsrfCookieName: "token",
      xsrfHeaderName: "X-XSRF-TOKEN",
      withCredentials: true,
    },
  });
}

function getParticipants(token) {
  return request({
    url: appglobal.api.FilterLocationClinician,
    method: "GET",
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
      xsrfCookieName: "token",
      xsrfHeaderName: "X-XSRF-TOKEN",
      withCredentials: true,
    },
  });
}

function getTime(id) {
  return request({
    url: appglobal.api.get_all_time_entries + "?clinicians_id=" + `${id}`,
    method: "GET",
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
      xsrfCookieName: "token",
      xsrfHeaderName: "X-XSRF-TOKEN",
      withCredentials: true,
    },
  });
}

function createTime(data, action, id) {
  return request({
    url:
      action === "Edit"
        ? appglobal.api.update_time_entries + id
        : appglobal.api.add_time_entries,
    method: "POST",
    data: data,
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
      xsrfCookieName: "token",
      xsrfHeaderName: "X-XSRF-TOKEN",
      withCredentials: true,
    },
  });
}

function getClients(id) {
  return request({
    url: appglobal.api.allClentBasedToLocation,
    method: "GET",
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
      xsrfCookieName: "token",
      xsrfHeaderName: "X-XSRF-TOKEN",
      withCredentials: true,
    },
  });
}

function getPatients(page) {
  return request({
    url: appglobal.api.get_patient + `?&page=${page}`,
    method: "GET",
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
      xsrfCookieName: "token",
      xsrfHeaderName: "X-XSRF-TOKEN",
      withCredentials: true,
    },
  });
}

function getLocation(page, sizePerPage) {
  return request({
    url:
      appglobal.api.get_all_location +
      +`?page=${page}&sizePerPage=${sizePerPage}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

function getLocations() {
  return request({
    url: appglobal.api.get_all_location,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

function getLocationNoPage() {
  return request({
    url: appglobal.api.get_all_location,
    method: "GET",
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
      xsrfCookieName: "token",
      xsrfHeaderName: "X-XSRF-TOKEN",
      withCredentials: true,
    },
  });
}

function getLocationPagination(page, sizePerPage) {
  return request({
    url:
      appglobal.api.get_all_location +
      `?page=${page}&sizePerPage=${sizePerPage}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

function filterLocation(page, sizePerPage, businessId) {
  return request({
    url:
      appglobal.api.get_all_location +
      `?page=${page}&business_id=${businessId}&sizePerPage=${sizePerPage}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

function getProfile(id) {
  return request({
    url: appglobal.api.get_profile + id,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

function getNotif(id) {
  return request({
    url: appglobal.api.get_notif + "?clinician_id=" + id,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

function getFamily(familypage) {
  return request({
    url: appglobal.api.get_all_family + `?page=${familypage}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

function createPatient(data, action, id) {
  return request({
    url:
      action === "add"
        ? appglobal.api.add_client
        : appglobal.api.edit_clients + id,
    method: "POST",
    data: data,
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
    },
  });
}

function createInstantfamily(data) {
  return request({
    url: appglobal.api.create_family,
    method: "POST",
    data: data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

function deleteEvent(id) {
  return request({
    url: appglobal.api.delete_event + id,
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
    },
  });
}

function deleteTime(id) {
  return request({
    url: appglobal.api.delete_time_entries + id,
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
    },
  });
}

function addFamily(data) {
  return request({
    url: appglobal.api.add_family,
    method: "POST",
    data: data,
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
    },
  });
}

const MessageService = {
  getEvents,
  createPatient,
  createInstantfamily,
  createEvent,
  createTime,
  addFamily,
  getTime,
  getLocation,
  filterLocation,
  getLocationPagination,
  getLocationNoPage,
  getProfile,
  getNotif,
  getFamily,
  getLocation,
  deleteEvent,
  getLocations,
  goLogin,
  getParticipants,
  getClients,
  getPatients,
  deleteTime,
};

export default MessageService;
