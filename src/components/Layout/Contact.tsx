import React from "react";
import { FaFacebook, FaPinterest, FaTumblr, FaYoutube } from "react-icons/fa";

const categories = [
	{
		title: "Hỗ trợ",
		items: ["Trả hàng", "Phương thức thanh toán", "Khuyến mãi", "Liên hệ"],
	},
	{
		title: "Thông tin về công ty",
		items: ["Giới thiệu về chúng tôi", "Cơ hội nghề nghiệp", "Tin tức", "Adidas Blog"],
	},
];

const Contact = () => {
	return (
		<div className="bg-black flex px-[100px] justify-between">
			<div className="flex items-center w-1/2 justify-between">
				{categories.map((category, index) => (
					<div
						className="my-4"
						key={index}
					>
						<h1 className="font-semibold text-xl text-white mb-3">{category.title}</h1>
						<ul className="text-white mb-2">
							{category.items.map((item, id) => (
								<li key={id}>{item}</li>
							))}
						</ul>
					</div>
				))}
			</div>
			<div className="">
				<h1 className="text-white font-bold text-3xl mt-6">Theo dõi chúng tôi</h1>
				<div className="flex items-center mt-3">
					<FaFacebook className="text-white rounded-full mx-2 text-2xl" />
					<FaYoutube className="text-white rounded-full mx-2 text-2xl" />
					<FaPinterest className="text-white rounded-full mx-2 text-2xl" />
					<FaTumblr className="text-white rounded-full mx-2 text-2xl" />
				</div>
			</div>
		</div>
	);
};

export default Contact;
