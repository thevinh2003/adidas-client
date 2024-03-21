export enum EGender {
	MALE = "MALE",
	FEMALE = "FEMALE",
	OTHER = "OTHER",
}

export const createGender = (gender: EGender) => {
	switch (gender) {
		case EGender.MALE:
			return "Male";
		case EGender.FEMALE:
			return "Female";
		case EGender.OTHER:
			return "Other";
		default:
			return "Male";
	}
};

export type Address = {
	street: string;
	city: string;
	building: string;
};

export type User = {
	id: string | number;
	email: string;
};
