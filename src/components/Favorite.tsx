import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import favoriteAPI from "../apis/favoriteAPI";
import Cookies from "js-cookie";

const device = Cookies.get("_fr_device");

function Favorite() {
  const [listFavorite, setListFavorite] = useState<any[]>([]);
  const [listDelete, setListDelete] = useState<any[]>([]);
  const [isSelected, setIsSelected] = useState<boolean[]>([]);
  const total = listFavorite?.reduce(
    (acc, product) => +acc + +product.Price,
    0
  );

  React.useEffect(() => {
    if(device) {
      favoriteAPI.getFavorite().then((res) => {
        setListFavorite(res?.favoriteProducts);
      });
    }
  }, []);

  function formatCurrencyVND(number: any) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(number);
  }

  useEffect(() => {
    let numItems = listFavorite?.length;
    for (let i = 0; i < numItems; i++) {
      setIsSelected((prev) => [...prev, false]);
    }
  }, [listFavorite]);

  const hanleClickDelete = () => {
    if(listDelete.length === 0) return;
    favoriteAPI.removeFavorite(listDelete).then((res) => {
      if (res?.message === "Remove product from favorite successfully") {
        window.location.reload();
      }
    });
  };

  return (
    <div
      className="w-1/4 self-end bg-white h-fit min-h-screen overflow-y-auto py-2 px-1 transform transition-all duration-500 ease-in-out"
      onClick={(e) => e.stopPropagation()}
    >
      {!Array.isArray(listFavorite) && (
        <div className="">
          <p className="font-bold text-center mt-[60px]">Chưa có sản phẩm yêu thích</p>
        </div>
      )}
      {listFavorite?.length > 0 && (
        <div className="">
          <p className="font-bold">Danh sách yêu thích</p>
        </div>
      )}
      <div className="flex justify-between mb-2">
        <span></span>
        {listFavorite?.length > 0 && (
          <h3 className="font-medium text-medium">
            Số lượng: {listFavorite?.length}
          </h3>
        )}
      </div>
      {listFavorite?.map((item, index) => (
        <div
          className="flex w-full justify-around items-center bg-gray-200 rounded-md mb-4"
          key={index}
        >
          <div className="mx-3">
            <input
              type="checkbox"
              checked={isSelected[index]}
              onClick={() => {
                setIsSelected((prev) => {
                  const newIsSelected = [...prev];
                  newIsSelected[index] = !newIsSelected[index];
                  return newIsSelected;
                });
                setListDelete((prev) => {
                  return [...prev, item.id];
                });
              }}
            />
          </div>
          <div className="w-1/2">
            <img
              src={item?.PhotoLink}
              alt=""
              className="w-[200px] h-[200px] object-cover p-3"
            />
          </div>
          <div className="w-1/2  ">
            <div>
              <p className="font-bold">{item?.ProductName}</p>
            </div>
            <div>
              <p>
                Giá : <span>{formatCurrencyVND(+item?.Price)}</span>
              </p>
            </div>
            <div className="flex flex-col">
              <Link to={"/detail/" + item?.id}>
                <button className="border border-black rounded-lg px-6 py-1 mt-3">
                  Xem chi tiết
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
      {listFavorite?.length > 0 && (
        <div>
          <p className="font-bold text-xl">
            Tổng tiền : <span>{formatCurrencyVND(+total)}</span>
          </p>
        </div>
      )}
      {listFavorite?.length > 0 && (
        <div className="mt-3 flex justify-around">
          <button
            onClick={hanleClickDelete}
            className=" bg-white text-black hover:opacity-70 hover:bg-red-500 rounded-lg px-8 py-3 font-semibold mx-auto text-xl w-full mb-4 border border-black cursor-pointer"
          >
            Xóa
          </button>
        </div>
      )}
    </div>
  );
}

export default Favorite;
