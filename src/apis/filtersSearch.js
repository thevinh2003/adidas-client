import { makeRequest } from "../axios";

const filtersAPI = {
  filterProducts: async ({
    name,
    latest,
    mostSold,
    lowestPrice,
    highestPrice,
    priceRange,
    color,
    size,
  }) => {
    try {
      const queryParams = new URLSearchParams({
        name,
        latest,
        mostSold,
        lowestPrice,
        highestPrice,
        priceRange,
        color,
        size
      });
      /*
      name: tên sản phẩm,
      latest: sản phẩm mới nhất,
      mostSold: sản phẩm bán chạy nhất,
      lowestPrice: sản phẩm giá thấp nhất,
      highestPrice: sản phẩm giá cao nhất,
      priceRange: khoảng giá,
      color: màu sắc,
      size: kích thước
      */

      const response = await makeRequest.get(
        `/api/v1/products/filter?${queryParams.toString()}`
      );
      return response.data;
    } catch (error) {
      return error?.response?.data;
    }
  },
};

export default filtersAPI;
