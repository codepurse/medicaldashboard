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

function getMembers(id) {
  return request({
    url: appglobal.api.get_members + id,
    method: "GET",
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
      xsrfCookieName: "token",
      xsrfHeaderName: "X-XSRF-TOKEN",
      withCredentials: true,
    },
  });
}

function getClinicians() {
  return request({
    url: appglobal.api.get_all_clinicians,
    method: "GET",
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
      xsrfCookieName: "token",
      xsrfHeaderName: "X-XSRF-TOKEN",
      withCredentials: true,
    },
  });
}

function createClinicians(data, action, id) {
  return request({
    url: action
      ? appglobal.api.update_clinician + id
      : appglobal.api.add_clinician,
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

function getLocation(page) {
  return request({
    url: appglobal.api.get_all_location + `?page=${page}`,
    method: "GET",
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
      xsrfCookieName: "token",
      xsrfHeaderName: "X-XSRF-TOKEN",
      withCredentials: true,
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

function getBusiness(page) {
  return request({
    url: appglobal.api.get_all_business,
    method: "GET",
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
      xsrfCookieName: "token",
      xsrfHeaderName: "X-XSRF-TOKEN",
      withCredentials: true,
    },
  });
}

function getAllBusiness(page) {
  return request({
    url: appglobal.api.get_all_business + `?page=${page}`,
    method: "GET",
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
      xsrfCookieName: "token",
      xsrfHeaderName: "X-XSRF-TOKEN",
      withCredentials: true,
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
      Authorization: "Bearer " + Cookies.get("token"),
      xsrfCookieName: "token",
      xsrfHeaderName: "X-XSRF-TOKEN",
      withCredentials: true,
    },
  });
}

function createLocation(data, action, id) {
  return request({
    url: action
      ? appglobal.api.update_location + id
      : appglobal.api.add_location,
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

function updateLocation(data, id) {
  return request({
    url: appglobal.api.update_location + id,
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

function createBusiness(data, action, id) {
  return request({
    url: action
      ? appglobal.api.update_business + id
      : appglobal.api.add_business,
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
      Authorization: "Bearer " + Cookies.get("token"),
      xsrfCookieName: "token",
      xsrfHeaderName: "X-XSRF-TOKEN",
      withCredentials: true,
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
      action === "add" || action
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

function createNotes(data, id, action) {
  return request({
    url: action
      ? appglobal.api.update_notes
      : appglobal.api.create_notes + id + "/create-notes",
    method: "POST",
    data: data,
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
    },
  });
}

function uploadFile(data) {
  return request({
    url: appglobal.api.add_document,
    method: "POST",
    data: data,
    headers: {
      Authorization: "Bearer " + Cookies.get("token"),
    },
    onUploadProgress: (progressEvent) => {
      let { loaded, total } = progressEvent;
      console.log((loaded / total) * 100);
    },
  });
}

function downloadFile(data) {
  return request({
    url: appglobal.api.download_files + `?file=${data}`,
    method: "GET",
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
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
  createLocation,
  addFamily,
  createClinicians,
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
  downloadFile,
  goLogin,
  getParticipants,
  getClients,
  getMembers,
  getPatients,
  getBusiness,
  getAllBusiness,
  deleteTime,
  uploadFile,
  updateLocation,
  createBusiness,
  createNotes,
};

export default MessageService;
