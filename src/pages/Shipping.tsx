import React, { useContext, useEffect, useState } from "react";
import { products } from "../constants/products";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";
import { Comment } from "../types/product";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
import orderAPI from "../apis/orderAPI";

const cart = {
	id: 1,
	products: [
		{ product: products[0], quantity: 2 },
		{ product: products[1], quantity: 3 },
	],
};

function formatCurrencyVND(number: number) {
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	}).format(number);
}

const Shipping = () => {
	const navigate = useNavigate();
	const price = cart.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
	const discount = 30;
	const shipFee = 30000;
	const [comments, setComments] = useState(cart.products.reduce((acc, item) => [...acc, ...item.product.comments], [] as Comment[]));
	const [newCommentState, setNewCommentState] = useState({
		comment: "",
		title: "",
	});
	const [orders, setOrders] = useState<any>()
	const [params] = useSearchParams()

	useEffect(() => {
		const handle = async () => {
			// const data = await productAPI.getProductByArrId(params.get('productId'))
			const data = await orderAPI.getOrdersDetailByUser(params.get('id'), 'Shipping')
			if (data) {
				setOrders(data)
			}
		}
		handle()
	}, [])

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
				<div
					key={index.toString()}
					className="mr-[2px]"
				>
					{star}
				</div>
			))}
		</div>
	);
	const onNewCommentStateChange = (event: any) => {
		setNewCommentState({ ...newCommentState, [event.target.name]: event.target.value });
	};

	return (
		<div className="p-[120px]">
			{
				orders?.map((item: any, index: number) => {
					let total = 0
					return (
						<>
							<div className="mb-20" key={index}>
								{/* <div className="flex jutify-between">
									<div className="flex flex-col text-lg">
										<div className="font-medium text-md">Đơn hàng: {item?.Order?.id}</div>
										<div className="text-green-500 text-2xl font-medium">Đơn hàng đã hoàn thành</div>
									</div>
									<button
										className="bg-black text-white px-8 py-4 rounded-xl"
										onClick={() => navigate(-1)}
									>
										Trở lại
									</button>
								</div> */}
								<div className="flex justify-between">
									<div className="flex flex-col text-lg">
										<div className="font-medium text-md">Đơn hàng: {item.id}</div>
										<div className="text-red-500 text-2xl font-medium">Đang giao hàng</div>
									</div>
									<button
										className="bg-black text-white px-8 py-4 rounded-xl"
										onClick={() => navigate(-1)}
									>
										Trở lại
									</button>
								</div>
								{/* <div className="mt-6 rounded-lg bg-gray-200 flex justify-between items-center p-6 ">
									<p>Cảm ơn bạn đã mua sắm tại Adidas</p>
									<div className="flex">
										<button className="bg-transparent border border-black rounded-lg px-5 py-2 font-medium">Yêu cầu hóa đơn điện tử</button>
										<button className="bg-black text-white rounded-lg px-5 py-2 font-medium ml-4">Hỗ trợ trực tuyến</button>
									</div>
								</div> */}
								<h1 className="my-6 text-3xl font-bold">Địa chỉ nhận hàng</h1>
								<div className="p-4 rounded-lg border border-black mb-4 shadow-md">
									<p>{item?.User?.FullName}</p>
									<p>Địa chỉ nhận hàng: {item?.ShippingAddress}</p>
									<p>Số điện thoại: {item?.User?.PhoneNumber}</p>
								</div>
								<h1 className="my-6 text-3xl font-bold">Sản phẩm</h1>
								<div key={index} >
									{item?.Products?.map((product: any, index: number) => {
										console.log('check: ', product.ProductName);
										
										total += product?.Price * product?.OrderDetail?.Quantity
										return (
											<div key={index} className="flex justify-between p-4 items-center rounded-lg border border-black mb-4 shadow-md">
												<div className="flex items-center">
													<img
														src={product?.PhotoLink}
														alt=""
														className="w-[80px] h-[80px] rounded-md mr-4"
													/>
													<div className="flex flex-col py-2">
														<div className="text-gray-300 font-medium">Tên sản phẩm</div>
														<div className="text-lg uppercase font-semibold">{product?.ProductName}</div>
													</div>
												</div>
												<div className="flex flex-col py-2">
													<div className="text-gray-300 font-medium">Đơn giá</div>
													<div className="text-lg uppercase font-semibold">{formatCurrencyVND(product?.Price)}</div>
												</div>
												<div className="flex flex-col py-2">
													<div className="text-gray-300 font-medium">Số lượng</div>
													<div className="text-lg uppercase font-semibold">{product?.OrderDetail?.Quantity}</div>
												</div>
												<div className="flex flex-col py-2">
													<div className="text-gray-300 font-medium">Thành tiền</div>
													<div className="text-lg uppercase font-semibold">{formatCurrencyVND(product?.Price * product?.OrderDetail?.Quantity)}</div>
												</div>
											</div>
										)})
									}
								</div>
								<div className="flex justify-between py-2">
									<div className="text-gray-300">Tổng tiền hàng: <b className="text-black">{formatCurrencyVND(total)}</b></div>
									<div className="text-gray-300">Phí vận chuyển: <b className="text-black">{formatCurrencyVND(item?.Shipping?.ShippingCost)}</b></div>
									
								</div>
								<div className="flex justify-between py-2">
									<div className="text-gray-300 text-xl">Tổng thanh toán: <b className="text-black">{formatCurrencyVND(item?.TotalAmount)}</b></div>
									<div className="text-gray-300">Voucher giảm: <b className="text-black">{formatCurrencyVND(item?.Voucher?.VoucherValue)}</b></div>
								</div>

								{/* <h1 className="my-6 text-3xl font-bold">Sản phẩm</h1>
								<div className="flex justify-between p-4 items-center rounded-lg border border-black mb-4 shadow-md">
									<div className="flex items-center">
										<img
											src={item?.Product?.PhotoLink}
											alt=""
											className="w-[80px] h-[80px] rounded-md mr-4"
										/>
										<div className="flex flex-col py-2">
											<div className="text-gray-300 font-medium">Tên sản phẩm</div>
											<div className="text-lg uppercase font-semibold">{item?.Product?.name}</div>
										</div>
									</div>
									<div className="flex flex-col py-2">
										<div className="text-gray-300 font-medium">Đơn giá</div>
										<div className="text-lg uppercase font-semibold">{item?.Product?.Price.toLocaleString("vi-vn", { style: "currency", currency: "VND" })}</div>
									</div>
									<div className="flex flex-col py-2">
										<div className="text-gray-300 font-medium">Số lượng</div>
										<div className="text-lg uppercase font-semibold">{item?.Quantity}</div>
									</div>
									<div className="flex flex-col py-2">
										<div className="text-gray-300 font-medium">Thành tiền</div>
										<div className="text-lg uppercase font-semibold">{item?.Order?.TotalAmount}</div>
									</div>
								</div> */}
							</div>
						</>
					)
				})
			}

		</div >
	);
};

export default Shipping;
