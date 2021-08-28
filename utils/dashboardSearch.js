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
      result = response.data.data
    })
    .catch((error) => {});
  return result;
};
