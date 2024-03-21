import { User } from "./user";

export type TProduct = {
	name: string;
	status?: string;
	id: string | number;
	category: string;
	price: number;
	remain: number;
	comments: Comment[];
	images: string[];
	departments: string[];
};

export type Comment = {
	commenter: User;
	comment: string;
	date: string;
	title: string;
	rate: number;
};
