import { AiOutlineStar } from "react-icons/ai";
import { FiCopy } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { BsStarHalf } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../constants/products";
import { Comment } from "../types/product";
import detailAPI from "../apis/detailAPI";
import favoriteAPI from "../apis/favoriteAPI";
import reviewAPI from "../apis/reviewAPI";
import cartAPI from "../apis/cartAPI";

const Detail = () => {
  const device = Cookies.get("_fr_device");
  const navigate = useNavigate();
  const { id } = useParams();
  const [detailData, setDetailData] = useState<any>(null);
  const [reviewData, setReviewData] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState(-1);
  const [size, setSize] = useState(0);
  const [cart, setCart] = useState<any>({});
  const [isShowShare, setIsShowShare] = useState<any>(false)

  React.useEffect(() => {
    setCart({ Size: size, ProductID: id, Color: detailData?.product?.Color});
  }, [size, id, detailData?.product?.Color]);

  const handleAddToCart = async () => {
    if (cart?.Size !== 0) {
      const response = await cartAPI.addCart(cart);
      if (response?.message === "Add cart successfully") {
        toast.success("Đã thêm vào giỏ hàng");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        toast.error("Thêm vào giỏ hàng thất bại");
      }
    }
    else {
      alert('Bạn cần chọn size')
    }
  };

  const [rate, setRate] = useState(5);
  const [comment, setComment] = useState("");

  const addFavorite = async () => {
    const response = await favoriteAPI.addFavorite(id);
    if (response?.message) {
      const notify = () => toast.success("Đã thêm vào danh sách yêu thích");
      notify();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const addComment = async () => {
    if (!device) {
      const notify = () => toast.error("Vui lòng đăng nhập để đánh giá");
      notify();
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }
    if (comment === "") {
      const notify = () => toast.error("Vui lòng nhập nội dung đánh giá");
      notify();
    }

    const response = await reviewAPI.createReview({
      ProductID: id,
      Rating: rate,
      Review: comment,
    });

    if (response?.message === "Review created") {
      const notify = () => toast.success("Đã đánh giá sản phẩm");
      notify();
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  const createStar = (rate: number) => {
    const fullStar = Math.floor(rate);
    const emptyStar = Math.floor(5 - rate);

    const stars = new Array<any>(0);
    for (let i = 0; i < fullStar; i++) {
      stars.push(<AiFillStar />);
    }
    if (!Number.isInteger(rate)) stars.push(<BsStarHalf />);
    for (let i = 0; i < emptyStar; i++) stars.push(<AiOutlineStar />);
    return stars;
  };
  const RatingStars = ({ stars }: { stars: any[] }) => (
    <div className="flex items-center">
      {stars.map((star, index) => (
        <div key={index.toString()} className="mr-[2px]">
          {star}
        </div>
      ))}
    </div>
  );

  function formatCurrencyVND(number: any) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(number);
  }

  React.useEffect((): any => {
    detailAPI.getDetail(id).then((response) => {
      setDetailData(response);
    });
    reviewAPI.getReviews(id).then((response) => {
      setReviewData(response[0]);
    });
  }, [id]);

  return (
    <div className="px-[120px]">
      {/* product detail */}
      <div className="flex justify-between my-[100px]">
        <div className="flex w-1/2 items-start  ml-0">
          {/* banner image */}
          <img
            src={detailData?.product?.PhotoLink}
            alt="avatar"
            className="w-[360px] h-[360px] object-cover rounded-md"
          />
        </div>
        <div className="w-1/2">
          <h1 className="text-3xl font-bold uppercase">
            {detailData?.product?.ProductName}
              <button
              className="bg-black hover:opacity-90 text-white rounded-lg py-2 px-5 text-sm float-end"
              onClick={() => setIsShowShare(!isShowShare)}
            >
              Chia sẻ
            </button>
          </h1>
          {
            isShowShare ? 
            <span className="flex gap-1 items-center float-end py-2 px-2 rounded-lg shadow-md mt-1">
              <FiCopy 
                size={18} 
                cursor='pointer' 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  setIsShowShare(false)
                  const notify = () => toast.success("Đã sao chép");
                  notify();
                }}
              />
              {window.location.href}
            </span>
            : ''
          }
          <p className="text-xl">
            {detailData?.product?.Categories[0]?.CategoryName}
          </p>
          <p className="text-lg">
            {formatCurrencyVND(parseInt(detailData?.product?.Price))}
          </p>
          <h3 className="text-xl font-semibold my-4">Chọn kích cỡ</h3>
          {/* sizes */}
          <div className="grid grid-cols-3 mb-4 w-full">
            {detailData?.product?.Size.split(", ")
              .sort()
              .map((size: any, index: any) => (
                <div
                  key={size}
                  className={`border rounded-lg px-8 py-3 font-semibold mx-auto text-xl mb-4 cursor-pointer ${
                    selectedItem === index && "border-black"
                  } w-[90%] text-center`}
                  onClick={() => {
                    setSelectedItem(index === selectedItem ? -1 : index);
                    setSize(
                      detailData?.product?.Size.split(", ").sort()[index]
                    );
                  }}
                >
                  {size}
                </div>
              ))}
          </div>
          {detailData?.product?.StockQuantity <= 0 && (
            <button className="bg-red-500 text-white rounded-lg px-3 py-2 text-3xl mb-4">
              Hết hàng
            </button>
          )}
          {detailData?.product?.StockQuantity > 0 && (
            <button
              onClick={() => {
                handleAddToCart();
              }}
              className="bg-black text-white hover:opacity-70 rounded-full px-8 py-3 font-semibold mx-auto text-xl w-full mb-4 cursor-pointer"
            >
              Cho vào giỏ hàng
            </button>
          )}
          {device && detailData?.product?.FavoriteProducts.length === 0 && (
            <button
              onClick={addFavorite}
              className="bg-white rounded-full px-8 py-3 font-semibold mx-auto text-xl border border-black w-full flex items-center justify-center cursor-pointer hover:bg-[#FFB6C1]"
            >
              Yêu thích
              <AiOutlineHeart className="ml-2 text-2xl" />
            </button>
          )}
        </div>
      </div>
      {/* comments */}
      <div>
        <h1 className="text-3xl font-bold">Đánh giá sản phẩm</h1>
        {/* new comment box */}
        <div className="my-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold mb-1">
              Số lượng đánh giá ({reviewData?.ProductReviews?.length})
            </h1>
          </div>
          <textarea
            placeholder="Nội dung"
            name="comment"
            className="border-2 mb-4 px-2 py-8 rounded-lg resize-none w-full"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button
            onClick={addComment}
            className="bg-black text-white hover:opacity-70 rounded-lg px-8 py-3 font-semibold mx-auto text-xl w-fit mt-4"
          >
            Đánh giá
          </button>
        </div>
        {/* comments list */}
        <div className="border-t-2">
          {reviewData?.ProductReviews?.map((comment: any, index: any) => (
            <div key={index} className="my-4">
              <h1 className="text-xl font-semibold">Khách hàng</h1>
              <RatingStars stars={createStar(comment?.Rating)} />
              <div className="">
                <p>{comment?.Review}</p>
                <p className="text-xl text-gray-400">
                  {formatDate(comment?.ReviewDate)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer theme="light" autoClose={3000} />
    </div>
  );
};

export default Detail;
