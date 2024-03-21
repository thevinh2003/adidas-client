import { makeRequest } from "../axios";
import Cookies from "js-cookie";

const device = Cookies.get("_fr_device");

const detailAPI = {
  // GET /api/v1/products/:id
  getDetail: async (id) => {
    try {
      const url = device
        ? `/api/v1/products/${id}/user`
        : `/api/v1/products/${id}`;
      const response = await makeRequest.get(url);
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
};

export default detailAPI;
