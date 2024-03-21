import { makeRequest } from "../axios";

const favoriteAPI = {
  // POST: /api/v1/products/favorite/add
  addFavorite: async (ProductID) => {
    try {
      const response = await makeRequest.post(`/api/v1/products/favorite/add`, {
        ProductID,
      });
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
  //  POST: /api/v1/products/favorite/remove
  removeFavorite: async (ListProductID) => {
    try {
      const response = await makeRequest.post(
        `/api/v1/products/favorite/remove`,
        { ListProductID }
      );
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
  // GET: /api/v1/products/favorite
  getFavorite: async () => {
    try {
      const response = await makeRequest.get(`/api/v1/products/favorite`);
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
};

export default favoriteAPI;
