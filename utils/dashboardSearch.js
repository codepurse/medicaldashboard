import axios from "axios";
import appglobal from "../services/api/api.services";
import Cookies from "js-cookie";
const ourRequest = axios.CancelToken.source();

export const searchTable = async (id, query) => {
  await axios({
    method: "get",
    url:
      appglobal.api.base_api +
      appglobal.api.get_events +
      `?clinician_id=${id}&q=test`,
    cancelToken: ourRequest.token,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + Cookies.get("token"),
    },
  })
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (response) {
      console.log(response);
      return response;
    });
  return () => {
    ourRequest.cancel();
  };
};
