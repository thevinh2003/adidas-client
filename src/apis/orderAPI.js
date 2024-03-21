import { makeRequest } from "../axios"

const orderAPI = {
    createOrder: async ({orders, products}) => {
        try {
            const response = await makeRequest.post(`/api/v1/orders/create`, { orders, products });
            return response?.data;
        } catch (error) {
            return error?.response?.data;
        }
    },
    getAllOrdersDetailByUser: async (type) => {
        try {
            const response = await makeRequest.get(`/api/v1/orders/detail/user/all?type=${type}`);
            return response?.data;
        } catch (error) {
            return error?.response?.data;
        }
    },
    getOrdersDetailByUser: async (id, type) => {
        try {
            const response = await makeRequest.get(`/api/v1/orders/detail/user?id=${id}&type=${type}`);
            return response?.data;
        } catch (error) {
            return error?.response?.data;
        }
    },
}

export default orderAPI
