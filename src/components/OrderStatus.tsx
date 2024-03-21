import React, { useState } from "react";

const OrderStatus = () => {
	const statuses = ["Đặt hàng thành công", "Đang giao", "Đơn hàng được giao thành công"];
	const [statusIndex, setStatusIndex] = useState(0);

	const handleStatusChange = (index: number) => {
		setStatusIndex(index);
	};

	return (
		<div className="p-4">
			<div className="p-4 rounded">
				<div className="relative h-2 w-full bg-gray-200 mt-2 rounded">
					<div className={`absolute h-full bg-blue-500 rounded transition-all duration-500 ease-in-out ${statusIndex === 0 ? "w-1/5" : statusIndex === 1 ? "w-2/5" : statusIndex === 2 ? "w-3/5" : statusIndex === 3 ? "w-4/5" : "w-full"}`}></div>
					{statuses.map((status, index) => (
						<div
							key={index}
							className="absolute top-0 left-0 h-2 w-full flex justify-between items-center pr-2 pl-2"
						>
							<div className={`h-3 w-3 rounded-full bg-white border ${index <= statusIndex ? "border-blue-500" : "border-gray-200"}`}></div>
						</div>
					))}
				</div>
				<div className="flex justify-between mt-4">
					{statuses.map((status, index) => (
						<button
							key={index}
							onClick={() => handleStatusChange(index)}
							className={`text-sm ${statusIndex >= index ? "text-blue-500 font-bold" : "text-gray-500"}`}
						>
							{status}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default OrderStatus;
