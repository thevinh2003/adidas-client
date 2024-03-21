import React, { useState } from "react";
import { MdPriceChange } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Product = (props:any) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const data = props['data-products'];
  
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-wrap gap-5">
      {data && data?.map((product: any, index: number) => (
        <div  
          key={index}
          className="mb-4 relative w-[260px]"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(-1)}
        >
          {product.PhotoLink && (
            <img
              src={product.PhotoLink}
              alt={`avatar of ${product.ProductName}`}
              className={`w-[360px] h-[360px] object-cover rounded-md`}
            />
          )}
          {hoveredIndex === index && (
            <div className="bg-black bg-opacity-50 flex items-end justify-center -mt-10 z-10 absolute top-[40px] left-0 w-full h-[360px] rounded-md ">
              <button
                onClick={() => {
                  navigate(`/detail/${product.id}`);
                }}
                className="bg-white px-3 py-2 rounded-full relative cursor-pointer bottom-6"
              >
                Chi tiết
              </button>
            </div>
          )}
          <p className="text-lg font-semibold">{product.status}</p>
          <p className="font-bold text-lg uppercase">{product.ProductName}</p>
          <p>
            {product.Category} - {product.Size.split(", ").length} màu
          </p>
          <p style={{"display": "flex", "alignItems": "center"}}>
            <MdPriceChange className="mr-2" />
            {product.Price} đ
          </p>
        </div>
      ))}
      {!data && <p className="text-center mt-4">Không có sản phẩm nào</p>}
    </div>
  );  
};

export default Product;
