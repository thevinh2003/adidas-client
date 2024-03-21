import React, { useEffect, useState } from "react";
import OrderStatus from "../components/OrderStatus";
import { Link } from "react-router-dom";
import orderAPI from "../apis/orderAPI";

function formatCurrencyVND(number: number) {
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	}).format(number);
}

const Follow = () => {
	const [status, setStatus] = useState([false, true, false]);
	const saleOff = 10; // TODO: Implement a real sale system
	const [orders, setOrders] = useState<any>()
	// const totalQuantity = orders?.reduce((total: number, item: any) => total + item.Quantity, 0);
	// const price = orders?.reduce((total: number, item: any) => total + +item.Order.TotalAmount, 0);

	useEffect(() => {
		const handle = async () => {
			// const data = await productAPI.getProductByArrId(params.get('productId'))
			const data = await orderAPI.getAllOrdersDetailByUser('Shipping')
			if (data) {
				setOrders(data)
			}
		}
		handle()
	}, [])


	const handleFinish = async () => {
		const data = await orderAPI.getAllOrdersDetailByUser('Delivered')
		if (data) {
			setOrders(data)
		}
		setStatus([false, false, true])
	}

	const handleShipping = async () => {
		const data = await orderAPI.getAllOrdersDetailByUser('Shipping')
		if (data) {
			setOrders(data)
		}
		setStatus([false, true, false])
	}

	return (
		<div className="p-[120px]">
			<div className="flex mb-10">
				<h1 className="font-bold text-3xl mr-6">Theo dõi đơn hàng</h1>
				{/* status */}
				<div className="flex rounded-md bg-gray-200 font-semibold text-lg">
					<p
						onClick={() => handleShipping()}
						className={`p-2 mx-3 cursor-pointer select-none ${status[1] ? "border-b-4 border-black" : ""}`}
					>
						Đang giao
					</p>
					<p
						onClick={() => handleFinish()}
						className={`p-2 mx-3 cursor-pointer select-none ${status[2] ? "border-b-4 border-black" : ""}`}
					>
						Hoàn thành
					</p>
				</div>
			</div>
			{/* follow */}
			{orders?.map((order: any, index: number) => {
				let total = 0
				return (
					<>
						<div className={status[2] ? "flex justify-between w-100" : "flex gap-3 w-100"}>
							<p className="text-md font-medium">Đơn hàng: {order?.id}</p>
							<Link
								to={status[2] ? `/completed?id=${order?.id}` : `/shipping?id=${order?.id}`}
								className="text-blue-500 underline"
							>
								Chi tiết
							</Link>
						</div>
						<div className="border border-black rounded-md p-4 mt-3 mb-10">
							{
								order?.Products?.map((item: any, index: number) => {
									total += +(order?.Voucher ? item?.Price - item?.Price * order?.Voucher?.VoucherValue / 100 : item?.Price)
									return (
										<>
											<div className="grid grid-cols-2">
												<div
													key={index}
													className="flex justify-between items-start p-3"
												>
													<div className="flex w-2/3">
														<img
															src={item?.PhotoLink}
															alt=""
															className="w-[100px] h-[100px] object-cover rounded-md shadow-lg"
														/>
														<div className="flex flex-col ml-4">
															<p className="font-bold text-xl">{item?.ProductName}</p>
															<p className="text-gray-300">
																Đơn giá: <b className="text-black"> {item?.Price}</b>
															</p>
															<p className="text-gray-300">
																Kích cỡ: <b className="text-black"> {item?.OrderDetail?.size}</b>
															</p>
															<p className="text-gray-300">
																Số lượng: <b className="text-black"> {item?.OrderDetail?.Quantity}</b>
															</p>
														</div>
													</div>

												</div>
											</div>

										</>
									)
								})

							}
							<div className="flex justify-between border-t py-2">
								<h1 className="font-bold text-xl">Tổng thanh toán: {formatCurrencyVND(order?.TotalAmount)}</h1>
								<p className="text-gray-300">
									Số lượng: <b className="text-black"> {order?.Products?.length}</b>
								</p>
							</div>
						</div>
					</>
				)
			})}
		</div>
	);
};

export default Follow;
