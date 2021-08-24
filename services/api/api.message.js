import request from "../../services/api/api.request";
import appglobal from "../../services/api/api.services";

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
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

function getTime(id) {
  return request({
    url: appglobal.api.get_all_time_entries + "?clinician_id=" + `${id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

function addFamily(data) {
  return request({
    url: appglobal.api.add_family,
    method: "POST",
    data: data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

const MessageService = {
  getEvents,
  createPatient,
  createInstantfamily,
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
};

export default MessageService;
