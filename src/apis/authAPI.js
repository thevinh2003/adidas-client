import { makeRequest } from "../axios";

const authAPI = {
  // POST: /api/v1/auth/refreshtoken
  refreshToken: async () => {
    try {
      const reponse = await makeRequest.post("/api/v1/auth/refreshtoken");
      return reponse?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
  // POST: /api/v1/auth/register
  register: async (data) => {
    try {
      const response = await makeRequest.post("/api/v1/auth/register", data);
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
  // GET: /api/v1/auth/active
  active: async (email, token) => {
    try {
      const response = await makeRequest.get(
        `/api/v1/auth/active?email=${email}&token=${token}`
      );
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
  // POST: /api/v1/auth/login
  login: async (data) => {
    try {
      const response = await makeRequest.post("/api/v1/auth/login", data);
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
  // POST: /api/v1/auth/forgotpassword
  forgotPassword: async ({ email }) => {
    try {
      const response = await makeRequest.post("/api/v1/auth/forgotpassword", {
        email,
      });
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
  // GET: /api/v1/auth/forgotpassword/verify
  verifyForgotPassword: async (email, token) => {
    try {
      const response = await makeRequest.get(
        `/api/v1/auth/forgotpassword/verify?email=${email}&token=${token}`
      );
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },

  // GET: /api/v1/auth/google
  googleLogin: async (data) => {
    try {
      const response = await makeRequest.get("/api/v1/auth/google", data);
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
  // GET: /api/v1/auth/facebook
  facebookLogin: async (data) => {
    try {
      const response = await makeRequest.get("/api/v1/auth/facebook", data);
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
  // GET: /api/v1/users/current-user
  getCurrentUser: async () => {
    try {
      const response = await makeRequest.get("/api/v1/users/current-user");
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },

  // DELETE: /api/v1/auth/logout
  logout: async () => {
    try {
      const response = await makeRequest.delete("/api/v1/auth/logout");
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },

  // DELETE: /api/v1/auth/delete
  deleteAccount: async () => {
    try {
      const response = await makeRequest.delete("/api/v1/auth/delete");
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
};

export default authAPI;
