import { makeRequest } from "../axios"

const productAPI = {
  // GET /api/v1/products
  getProducts: async () => {
    try {
      const response = await makeRequest.get(`/api/v1/products`);
      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
};

export default productAPI;
