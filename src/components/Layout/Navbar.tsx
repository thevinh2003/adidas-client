import { RiSearch2Line } from "react-icons/ri";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import Categories from "./Categories";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, SetStateAction } from "react";
import Cookies from "js-cookie";

import BoxModel from "../BoxModel";
import Cart from "../Cart";
import Favorite from "../Favorite";
import filterAPI from "./../../apis/filtersSearch";

const device = Cookies.get("_fr_device");

const categories = [
  {
    item: "Nam",
    subItems: [
      "Dòng sản phẩm original",
      "Bóng đá",
      "Chạy",
      "Tập luyện",
      "Ngoài trời",
      "Bóng rổ",
      "Quần vợt",
      "Giới hạn",
    ],
  },
  {
    item: "Nữ",
    subItems: [
      "Dòng sản phẩm original",
      "Bóng đá",
      "Chạy",
      "Tập luyện",
      "Ngoài trời",
      "Bóng rổ",
      "Quần vợt",
      "Giới hạn",
    ],
  },
  {
    item: "Trẻ em",
    subItems: [
      "Dòng sản phẩm original",
      "Bóng đá",
      "Chạy",
      "Tập luyện",
      "Ngoài trời",
      "Bóng rổ",
      "Quần vợt",
      "Giới hạn 2",
    ],
  },
  {
    item: "Giảm giá",
    subItems: [
      "Dòng sản phẩm original",
      "Bóng đá",
      "Chạy",
      "Tập luyện",
      "Ngoài trời",
      "Bóng rổ",
      "Quần vợt",
      "Giới hạn",
    ],
  },
  {
    item: "Sắp và mới ra mắt",
    subItems: [
      "Dòng sản phẩm original",
      "Bóng đá",
      "Chạy",
      "Tập luyện",
      "Ngoài trời",
      "Bóng rổ",
      "Quần vợt",
      "Giới hạn",
    ],
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [models, setModels] = useState({
    search: false,
    cart: false,
    favorite: false,
  });
  const handleOpenModel = (name: string) => {
    setModels({
      ...models,
      [name]: true,
    });
  };
  const handleCloseModel = (name: string) => {
    setModels({
      ...models,
      [name]: false,
    });
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div className="flex items-center justify-between shadow-lg px-[120px]">
      {/* logo */}
      <a href="/">
        <img
          src="https://cdn.icon-icons.com/icons2/2699/PNG/512/adidas_logo_icon_168690.png"
          alt="logo"
          className="w-[60px] h-[60px] cursor-pointer"
        />
      </a>
      {/* categories */}
      <div className="w-1/3 flex justify-between">
        {categories.map((category) => (
          <Categories {...category} key={category.item} />
        ))}
      </div>
      {/* models */}
      <div className="flex items-center justify-between w-1/6">
        <RiSearch2Line
          className="text-2xl cursor-pointer"
          onClick={() => handleOpenModel("search")}
        />
        {/* search model */}
        <BoxModel
          isOpenModel={models.search}
          setIsOpenModel={(value: boolean) =>
            setModels({
              ...models,
              search: value,
            })
          }
        >
          <div
            className="flex bg-white rounded-full items-center px-2 py-4"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <input
              type="text"
              className="p-2 outline-none h-full w-full"
              autoFocus
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={handleInputChange}
            />
            <RiSearch2Line
              onClick={() => {
                navigate(`/?search=${searchTerm}`);
                handleCloseModel("search");
              }}
              className="text-3xl cursor-pointer text-gray-400"
            />
          </div>
        </BoxModel>
        <FaRegUser
          className="text-2xl cursor-pointer"
          onClick={() => { device ? navigate("/profile") : navigate("/login") }}
        />
        {device && (
          <>
            <FaRegHeart
              className="text-2xl cursor-pointer"
              onClick={() => {
                handleOpenModel("favorite");
              }}
            />
            <MdOutlineShoppingCart
              className="text-2xl cursor-pointer"
              onClick={() => {
                handleOpenModel("cart");
              }}
            />
          </>
        )}
      </div>
      <p>
        <div
          className={`bg-[rgba(0,0,0,0.1)]  z-50 fixed top-0 right-0 left-0 bottom-0 flex flex-col ${!models.cart && "hidden"
            } cursor-default`}
          onClick={() => handleCloseModel("cart")}
        >
          <Cart />
        </div>
        {device &&

          <div
            className={`bg-[rgba(0,0,0,0.1)]  z-50 fixed top-0 right-0 left-0 bottom-0 flex flex-col ${!models.favorite && "hidden"
              } cursor-default`}
            onClick={() => handleCloseModel("favorite")}
          >
            <Favorite />
          </div>
        }
      </p>
    </div>
  );
};

export default Navbar;
