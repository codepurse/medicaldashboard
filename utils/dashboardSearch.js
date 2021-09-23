import axios from "axios";
import appglobal from "../services/api/api.services";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

let call;
let result;
const once = (config = {}) => {
  if (call) {
    call.cancel("Only one request allowed at a time.");
  }
  call = axios.CancelToken.source();

  config.cancelToken = call.token;
  return axios(config);
};

export const searchPota = async (id, query) => {
  var config = {
    method: "get",
    url:
      appglobal.api.base_api +
      appglobal.api.get_events +
      `?clinician_id=${id}&q=${query}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + Cookies.get("token"),
    },
  };

  await once(config)
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {});
  return result;
};

export const searchTime = async (id, query) => {
  var config = {
    method: "get",
    url:
      appglobal.api.base_api +
      appglobal.api.get_all_time_entries +
      `?clinicians_id=${id}&clients_name=${query}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + Cookies.get("token"),
    },
  };

  await once(config)
    .then((response) => {
      result = response.data.data;
    })
    .catch((error) => {});
  return result;
};

export const searchEmr = async (query, filterEmr) => {
  var config = {
    method: "get",
    url:
      appglobal.api.base_api +
      appglobal.api.get_patient +
      `?&search=${query}&${filterEmr}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + Cookies.get("token"),
    },
  };

  await once(config)
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {});
  return result;
};

export const searchClinician = async (id, query) => {
  var config = {
    method: "get",
    url:
      appglobal.api.base_api +
      appglobal.api.get_all_clinicians +
      `?&q=${query}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + Cookies.get("token"),
    },
  };

  await once(config)
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {});
  return result;
};

export const searchLocation = async (query) => {
  var config = {
    method: "get",
    url:
      appglobal.api.base_api + appglobal.api.get_all_location + `?&q=${query}`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + Cookies.get("token"),
    },
  };

  await once(config)
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {});
  return result;
};
