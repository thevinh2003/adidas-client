import React, { PropsWithChildren } from "react";

const BoxModel = ({
	children,
	isOpenModel,
	setIsOpenModel,
}: PropsWithChildren & {
	isOpenModel: boolean;
	setIsOpenModel: any;
}) => {
	return (
		<div className={`bg-[rgba(0,0,0,0.1)]  z-50 fixed top-0 right-0 left-0 bottom-0 flex flex-col items-center justify-center ${!isOpenModel && "hidden"} cursor-default`}>
			{/* close button */}
			<div
				className="absolute top-5 right-5 cursor-pointer w-8 h-8 rounded-full hover:bg-red-500 hover:text-white flex items-center justify-center"
				onClick={() => setIsOpenModel(false)}
			>
				X
			</div>
			{children}
		</div>
	);
};

export default BoxModel;
