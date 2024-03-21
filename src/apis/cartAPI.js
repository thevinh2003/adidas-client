import { makeRequest } from "../axios";

const cartAPI = {
  getAllCart: async () => {
    try {
      const response = await makeRequest.get(`/api/v1/carts/user`);
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
  // GET: /api/v1/carts/product
  getCartProductByUser: async (data) => {
    try {
      const response = await makeRequest.get(
        `/api/v1/carts/product?productId=${data}`
      );
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
  changeProductCartDetail: async ({ cartId, cartDetailId, quantity, type }) => {
    try {
      const response = await makeRequest.post(
        "/api/v1/carts/cartdetail/change",
        { cartId, cartDetailId, quantity, type }
      );
      return response.data;
    } catch (error) {
      return error?.response.data;
    }
  },
  deleteCartDetail: async ({ cartDetailId }) => {
    try {
      const response = await makeRequest.delete(
        `/api/v1/carts/remove?cartDetailId=${cartDetailId}`
      );
      return response.data;
    } catch (error) {
      return error?.response.data;
    }
  },
  deleteAllCartDetail: async (arrCheck) => {
    try {
      const response = await makeRequest.post(`/api/v1/carts/remove/all`, {
        data: arrCheck,
      });
      return response.data;
    } catch (error) {
      return error?.response.data;
    }
  },
  addCart: async (data) => {
    try {
      const response = await makeRequest.post(`/api/v1/carts/add`, data);
      return response?.data;
    } catch (error) {
      return error?.response.data;
    }
  },
};

export default cartAPI;
