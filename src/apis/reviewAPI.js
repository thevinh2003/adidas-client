import { makeRequest } from "../axios";

const reviewAPI = {
  // GET /api/v1/products/:id/reviews
  getReviews: async (id) => {
    try {
      const response = await makeRequest.get(`/api/v1/products/${id}/reviews`);
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
  // POST /api/v1/products/reviews/create
  createReview: async (data) => {
    try {
      const response = await makeRequest.post(
        `/api/v1/products/reviews/create`,
        data
      );
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
  // DELETE /api/v1/products/reviews/:id
  deleteReview: async (id) => {
    try {
      const response = await makeRequest.delete(
        `/api/v1/products/reviews/${id}`
      );
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
  // PUT /api/v1/products/reviews/:id
  updateReview: async (id, data) => {
    try {
      const response = await makeRequest.put(
        `/api/v1/products/reviews/${id}`,
        data
      );
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
  // GET /api/v1/products/reviews/:id
  getReview: async (id) => {
    try {
      const response = await makeRequest.get(`/api/v1/products/reviews/${id}`);
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
};

export default reviewAPI;
