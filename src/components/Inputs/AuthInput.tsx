import React, { InputHTMLAttributes } from "react";

const AuthInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
	return (
		<input
			type="text"
			{...props}
			className="w-full px-4 py-2 outline-none bg-gray-200 rounded-full mt-4"
		/>
	);
};

export default AuthInput;
