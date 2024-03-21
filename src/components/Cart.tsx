import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cartAPI from "../apis/cartAPI";
import Cookies from "js-cookie";

const device = Cookies.get("_fr_device");

function Cart() {
	const [quantities, setQuantities] = useState<any>([]);
	const [isSelected, setIsSelected] = useState<boolean[]>([]);
	const [carts, setCarts] = useState<any>({})
	const [arrCheck, setArrCheck] = useState<any>([])
	const [arrCheckCart, setArrCheckCart] = useState<any>([])
	const navigate = useNavigate()
	const [total, setTotal] = useState<any>()

	const Increment = async (cartDetailId: number, quantity: number, type: string) => {
		// let newQuantities = [...quantities];
		// newQuantities[index] += 1;
		// setQuantities(newQuantities);
		await cartAPI.changeProductCartDetail({ cartId: carts.id, cartDetailId, quantity, type })
		const data = await cartAPI.getAllCart()
		setCarts(data)
		setTimeout(() => {
			window.location.reload();
		}, 1000);
	};
	const Decrement = async (cartDetailId: number, quantity: number, type: string) => {
		// let newQuantities = [...quantities];
		// newQuantities[index] -= 1;
		// setQuantities(newQuantities);
		await cartAPI.changeProductCartDetail({ cartId: carts.id, cartDetailId, quantity, type })
		const data = await cartAPI.getAllCart()
		setCarts(data)
		setTimeout(() => {
			window.location.reload();
		}, 1000);
	};

	useEffect(() => {
		const handle = async () => {
			if (device) {
				const data = await cartAPI.getAllCart()
				if (data) {
					setCarts(data)
				}
			}
		}
		handle()
	}, []);

	useEffect(() => {
		if (carts && carts.length > 0) {
			// const arr = new Array()
			let temp = 0
			carts?.map((item: any) => {
				// arr.push(item?.Quantity)
				temp += +item?.Product?.Price * item?.Quantity
			})
			// setQuantities(arr)
			setTotal(temp)
		}
	}, [carts])


	const handlePayment = () => {
		const str = arrCheck.join(',')
		if (str) {
			navigate(`/payment?productId=${str}`)
		}
	}


	const handleDelete = async (cartDetailId: number) => {
		await cartAPI.deleteCartDetail({ cartDetailId })
		const data = await cartAPI.getAllCart()
		setCarts(data)
	}

	const handleDeleteAll = async () => {
		if (arrCheck.length > 0) {
			await cartAPI.deleteAllCartDetail(arrCheckCart)
			await cartAPI.getAllCart()
		}
	}

	return (
		<div
			className="w-1/4 self-end bg-white h-fit min-h-screen overflow-y-auto py-2 px-1 transform transition-all duration-500 ease-in-out"
			onClick={(e) => e.stopPropagation()}
		>
			<div className="">
				<p className="font-bold">Giỏ hàng</p>
			</div>
			<div className="flex justify-between">
				<div>
					<p className="font-bold">số lượng : {carts?.length}</p>
				</div>
			</div>
			{carts && carts.length > 0 && carts?.map((item: any, index: number) => {
				return (
					<div
						className="flex w-full justify-around items-center bg-gray-200 rounded-md mb-4"
						key={index}
					>
						<div className="mx-3">
							{
								item?.Product?.StockQuantity === 0 ?
									<span className="font-medium">Hết hàng</span>
									:
									<input
										type="checkbox"
										checked={isSelected[index]}
										disabled={item?.Product?.StockQuantity === 0 ? true : false}
										onClick={() => {
											setIsSelected((prev) => {
												const newIsSelected = [...prev];
												newIsSelected[index] = !newIsSelected[index];
												return newIsSelected;
											});
											let obj = [...arrCheck]
											let temp = [...arrCheckCart]
											if (arrCheck.includes(item?.Product.id)) {
												obj = arrCheck.filter((e: number) => e !== item?.Product.id)
											}
											else {
												obj.push(item?.Product.id)
											}
											if (arrCheckCart.includes(item?.id)) {
												temp = arrCheckCart.filter((e: number) => e !== item?.id)
											}
											else {
												temp.push(item?.id)
											}
											setArrCheck(obj)
											setArrCheckCart(temp)
										}}
									/>
							}

						</div>
						<div className="w-1/2">
							<img
								src={item?.Product?.PhotoLink}
								alt=""
								className="w-[200px] h-[200px] object-cover p-3"
							/>
						</div>
						<div className="w-1/2  ">
							<div>
								<p className="font-bold">{item?.Product?.ProductName}</p>
							</div>
							<div>
								<p>
									Price :{" "}
									<span>
										{item?.Product?.Price?.toLocaleString("vi-VN", {
											style: "currency",
											currency: "VND",
										})}
									</span>
								</p>
							</div>
							<div>
								<p>
									Size :{" "}
									<span>
										{
											item?.Size
										}
									</span>
								</p>
							</div>
							<div className="flex flex-col">
								<label htmlFor="">Số lượng</label>
								<div className="flex items-center">
									<input
										className="rounded-lg text-center bg-white py-2  w-full"
										type="text"
										value={item?.Quantity}
										disabled
									/>
									{
										item?.Product?.StockQuantity === 0 ?
										'' :
										<>
											<div
												onClick={() => Increment(item.id, item?.Quantity, 'increment')}
												className="mx-2 cursor-pointer select-none p-2"
											>
												+
											</div>
											<div
												onClick={() => Decrement(item.id, item?.Quantity, 'decrement')}
												className="mx-2 cursor-pointer select-none p-2"
											>
												-
											</div>
										</>
									}

								</div>
								<button
									className="border border-black rounded-lg px-6 py-1 mt-3"
									onClick={() => handleDelete(item?.id)}
								>Xóa</button>
							</div>
						</div>
					</div>
				)
			}
			)}
			<div>
				<p className="font-bold text-xl">
					Tổng tiền :
					<span>{total}</span>
					{/* <span>{total.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</span> */}
				</p>
			</div>
			<div className="flex justify-around mt-3">
				<button
					className=" bg-white text-black hover:opacity-70 hover:bg-red-500 rounded-lg px-8 py-3 font-semibold mx-auto text-xl border border-black  w-1/7 mb-4 cursor-pointer"
					onClick={() => handlePayment()}
				>
					Thanh toán
				</button>

				<button
					className=" bg-white text-black hover:opacity-70 hover:bg-red-500 rounded-lg px-8 py-3 font-semibold mx-auto text-xl border border-black  w-1/7 mb-4 cursor-pointer"
					onClick={() => handleDeleteAll()}
				>Xóa</button>
			</div>
		</div>
	);
}

export default Cart;
