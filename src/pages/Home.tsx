import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import { IoFilterOutline } from "react-icons/io5";
import BoxModel from "../components/BoxModel";
import Products from "../components/Product/Products";
import WhiteButton from "../components/Buttons/WhiteButton";
import productAPI from "../apis/productAPI";
import { makeRequest } from "../axios";
import { useSearchParams } from "react-router-dom";
import filtersAPI from "../apis/filtersSearch";

interface SelectedOptions {
  [key: string]: string;
}

const filters = [
  {
    title: "Sắp xếp",
    values: [
      "Mặc định",
      "Mới nhất",
      "Bán nhiều nhất",
      "Giá thấp nhất",
      "Giá cao nhất",
    ],
  },
  {
    title: "Giá",
    values: [
      "Tất cả",
      "0-1.000.000 vnđ",
      "1.000.000 - 2.000.000 vnđ",
      "2.000.000 - 3.000.000 vnđ",
      "3.000.000 - 4.000.000 vnđ",
    ],
  },
  {
    title: "Màu sắc",
    values: ["Đen", "Xanh nước biển", "Xám", "Trắng", "Đỏ"],
  },
  {
    title: "Loại giày",
    values: ["Gốc", "Giới hạn", "Thể thao"],
  },
  {
    title: "Kích cỡ",
    values: ["38", "39", "40", "41", "42", "43", "44"],
  },
];

const Home = () => {
  const [isOpenFilterBox, setIsOpenFilterBox] = useState(false);
  const [products, setProducts] = useState([]);
  const [homeParams] = useSearchParams();
  const searchValue = homeParams.get("search") || "";
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  const [filterResults, setFilterResults] = useState<any[]>([]);

  if(searchValue) {
    selectedOptions["search"] = searchValue;
  }

  const fetchFilters = async (options: SelectedOptions) => {
    const filterOptions: any = {};
    try {
      Object.keys(options).forEach((key) => {
        switch (key) {
          case "Sắp xếp":
            switch (options[key]) {
              case "Mới nhất":
                filterOptions.latest = true;
                break;
              case "Bán nhiều nhất":
                filterOptions.mostSold = true;
                break;
              case "Giá thấp nhất":
                filterOptions.lowestPrice = true;
                break;
              case "Giá cao nhất":
                filterOptions.highestPrice = true;
                break;
              default:
                break;
            }
            break;
          case "Giá":
            if (options[key]) {
              const priceRange = options[key].replace(/[^\d-]/g, "");
              filterOptions.priceRange = priceRange;
            }
            break;
          case "Màu sắc":
            if (options[key]) {
              filterOptions.color = options[key];
            }
            break;
          case "Loại giày":
            break;
          case "Kích cỡ":
            if (options[key]) {
              filterOptions.size = options[key];
            }
            break;
          default:
            break;
        }
      });

      let url = "/api/v1/products/filter?";
      Object.keys(filterOptions).forEach((key, index) => {
        url += `${index === 0 ? "" : "&"}${key}=${filterOptions[key]}`;
      });
      const response = await makeRequest.get(url);
      setFilterResults(response?.data?.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  if(searchValue) {
    const data = filtersAPI.filterProducts({name: searchValue, latest: null, mostSold: null, lowestPrice: null, highestPrice: null, priceRange: null, color: null, size: null});
    data.then((res) => {setFilterResults(res?.products)});
  }

  useEffect(() => {
    productAPI.getProducts().then((res) => {
      setProducts(res?.products);
    });
  }, []);

  const handleFilter = () => {
    setIsOpenFilterBox(!isOpenFilterBox);
    fetchFilters(selectedOptions);
  };

  const handleChange = (title: string, value: string) => {
    setSelectedOptions((prevOptions) => {
      const updatedOptions = { ...prevOptions };
      const currentValue = prevOptions[title];
      if (currentValue === value) {
        delete updatedOptions[title];
      } else {
        updatedOptions[title] = value;
      }
      return updatedOptions;
    });
  };

  return (
    <div className="">
      <Banner />
      <div className="px-[120px]">
        <div className="flex justify-between items-center  my-20">
          <h1 className="text-3xl font-bold">Tổng quan sản phẩm</h1>
          <div
            className="rounded-md border border-gray-300 text-gray-300 flex items-center p-4 cursor-pointer"
            style={{ color: "black" }}
            onClick={() => setIsOpenFilterBox(!isOpenFilterBox)}
          >
            <IoFilterOutline className="mr-3 text-2xl" />
            Filter
          </div>
        </div>
        {filterResults?.length > 0 ? (
          <Products data={filterResults} />
        ) : (
          <Products data={products} />
        )}
        <div className="w-[360px] mx-auto">
          <WhiteButton
            rounded="full"
            text="Xem thêm"
            // onClick={handleFilter}
          />
        </div>
      </div>
      {isOpenFilterBox && (
        <BoxModel
          isOpenModel={isOpenFilterBox}
          setIsOpenModel={setIsOpenFilterBox}
        >
          <div className="bg-white rounded-lg p-6">
            <div className="flex w-full justify-between">
              {filters.map((item, outerIndex) => (
                <div
                  key={outerIndex}
                  className={
                    outerIndex < filters.length - 1 ? `mr-9 ${item.title}` : ""
                  }
                >
                  <h1 className="font-semibold text-xl">{item.title}</h1>
                  {item.values.map((value, innerIndex) => (
                    <div className={`flex ${value}`} key={innerIndex}>
                      <input
                        type="checkbox"
                        name={`sortBy_${item.title}`}
                        id={`sortBy_${innerIndex}`}
                        value={value}
                        onChange={() => handleChange(item.title, value)}
                        checked={selectedOptions[item.title] === value}
                      />
                      <label htmlFor={`sortBy_${innerIndex}`} className="ml-3">
                        {value}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div
              className="rounded border border-black px-6 py-2 w-fit cursor-pointer"
              onClick={() => {
                handleFilter();
              }}
            >
              Lọc
            </div>
          </div>
        </BoxModel>
      )}
    </div>
  );
};

export default Home;
