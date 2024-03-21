import React, { LabelHTMLAttributes } from "react";

const ImportantTextBox = ({ text, ...props }: { text: string } & LabelHTMLAttributes<HTMLLabelElement>) => {
	return (
		<label
			className="flex text-md font-medium"
			{...props}
		>
			{text} <p className="text-red-500">*</p>
		</label>
	);
};

export default ImportantTextBox;
