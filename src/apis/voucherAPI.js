import { makeRequest } from "../axios"

const voucherAPI = {
    getAllVoucher: async () => {
        try {
            const response = await makeRequest.get(`/api/v1/vouchers`);
            return response?.data;
        } catch (error) {
            return error?.response?.data;
        }
    },
}

export default voucherAPI
