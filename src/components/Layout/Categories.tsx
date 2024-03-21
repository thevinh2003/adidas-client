import React, { useState } from "react";
import BoxModel from "../BoxModel";

const Categories = ({ item, subItems }: { item: string; subItems: string[] }) => {
	const [isOpenModel, setIsOpenModel] = useState(false);
	return (
		<div
			className="cursor-pointer select-none"
			onClick={() => setIsOpenModel(!isOpenModel)}
		>
			<p className="font-semibold">{item}</p>
			{
				<BoxModel {...{ isOpenModel, setIsOpenModel }}>
					<div className="flex bg-white w-2/5 rounded-2xl m-auto  p-2 flex-wrap">
						{subItems.map((subItem) => (
							<p
								key={subItem}
								className="m-2 cursor-pointer"
							>
								{subItem}{" "}
							</p>
						))}
					</div>
				</BoxModel>
			}
		</div>
	);
};

export default Categories;
