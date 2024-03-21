import React from "react";

const privacies = ["Điều khoản bán hàng", "Điều khoản sử dụng", "Chính sách bảo mật Adidas"];

const Footer = () => {
	return (
		<div className="flex justify-between items-center px-[120px]">
			<p className="font-semibold">© 2023 Adidas, Inc. All Rights Reserved</p>
			<div className="flex items-center">
				{privacies.map((item) => (
					<p
						key={item}
						className="mx-2 font-semibold text-xl p-3"
					>
						{item}
					</p>
				))}
			</div>
		</div>
	);
};

export default Footer;
