import React, { ButtonHTMLAttributes } from "react";
import { styles } from "../../styles";
type Props = ButtonHTMLAttributes<HTMLButtonElement> & { text: string; rounded: "lg" | "sm" | "normal" | "full" };
const WhiteButton = (props: Props) => {
	return (
		<button
			{...props}
			className={`${styles.borderWrapper[props.rounded]} my-4`}
		>
			{props.text}
		</button>
	);
};

export default WhiteButton;
