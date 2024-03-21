import React, { useContext, useState } from "react";
import BoxModel from "../BoxModel";

type FormState = {
	[key: string]: string;
};

const Address = () => {
	const [isOpenModel, setIsOpenModel] = useState(false);
	const [isOpenEditModel, setisOpenEditModel] = useState([false, false, false]);
	const [formState, setFormState] = useState<FormState>({
		fullName: "",
		street: "",
		building: "",
		city: "",
		strict: "",
		guild: "",
		code: "",
		phoneNumber: "",
	});
	const [error, setError] = useState<any>({
		fullName: false,
		phoneNumber: false,
		building: false,
		city: false,
		street: false,
		strict: false,
		guild: false,
		code: false,
	});
	const keys = Object.keys(formState);

	const onFormStateChange = (e: any) => {
		setFormState({
			...formState,
			[e.target.name]: e.target.value,
		});
	};
	const onSubmit = (index = -1) => {
		console.log(index);
		if (index >= 0) {
			const n = keys.length;
			for (let i = 0; i < n; i++) {
				const key = keys[i];
				// alert(formState[key]);
				if (!formState[key]) {
					setError((prev: any) => ({ ...prev, [key]: true }));
				} else {
					setError((prev: any) => ({ ...prev, [key]: false }));
				}
			}
			if (keys.some((key) => error[key])) {
				console.log("cc");
				return;
			}
			const newUser = {
				building: formState.building,
				city: formState.city,
				street: formState.street,
			};
			// setUser({ ...user});
			let newModels = isOpenEditModel;
			newModels[index] = !isOpenEditModel[index];
			setisOpenEditModel(newModels);
		} else {
			const n = keys.length;
			for (let i = 0; i < n; i++) {
				const key = keys[i];
				// alert(formState[key]);
				if (!formState[key]) {
					setError((prev: any) => ({ ...prev, [key]: true }));
				} else {
					setError((prev: any) => ({ ...prev, [key]: false }));
				}
			}
			if (keys.find((key) => error[key])) return;
			// setUser({
			// 	...user,
			// });
			setisOpenEditModel([...isOpenEditModel, false]);
			setIsOpenModel(false);
		}
	};
	const onCancel = () => {
		setIsOpenModel(false);
	};
	const onDelete = (index: number) => {
		// const newUserAddress = user.address.filter((_, i) => i !== index);
		// setUser({ ...user, address: newUserAddress });
	};
	return (
		<div className="bg-gray-200 rounded-lg p-4 w-full ml-4">
			<h2 className="font-bold text-2xl">Sổ địa chỉ</h2>
			<p className="text-sm my-2">Bạn còn {5 - 1}/5 ô địa chỉ.</p>
			{/* {user.address.map((item, index) => (
				<div
					className="border border-black rounded-lg mb-6"
					key={index}
				>
					<BoxModel
						isOpenModel={isOpenEditModel[index]}
						setIsOpenModel={(value: boolean) => {
							let newModels = [...isOpenEditModel]; // create a copy of the array
							newModels[index] = value;
							setisOpenEditModel(newModels);
						}}
					>
						<div className="bg-white rounded-md w-1/2 h-screen p-6">
							<h1 className="text-xl font-bold text-center">Thay đổi địa chỉ</h1>
							<form
								action=""
								className="flex flex-col  justify-between h-[70%] my-6"
							>
								<input
									className="w-full border border-black rounded-lg p-2"
									type="text"
									name="fullName"
									id=""
									placeholder="Họ và tên"
									value={formState.fullName}
									onChange={onFormStateChange}
									disabled
								/>
								{error.fullName && (
									<label
										htmlFor="fullName"
										className="text-red-500"
									>
										Yêu cầu nhập
									</label>
								)}
								<input
									className="w-full border border-black rounded-lg p-2"
									type="text"
									name="street"
									id=""
									placeholder="Số nhà / Tên đường * "
									value={formState.street}
									onChange={onFormStateChange}
								/>
								{error.street && (
									<label
										htmlFor="street"
										className="text-red-500"
									>
										Yêu cầu nhập
									</label>
								)}
								<input
									className="w-full border border-black rounded-lg p-2"
									type="text"
									name="building"
									id=""
									placeholder="Tòa nhà / Số tầng "
									value={formState.building}
									onChange={onFormStateChange}
								/>
								{error.building && (
									<label
										htmlFor="building"
										className="text-red-500"
									>
										Yêu cầu nhập
									</label>
								)}
								<div className="grid grid-cols-2 gap-6">
									<div className="">
										<input
											className="w-full border border-black rounded-lg p-2"
											type="text"
											name="city"
											id=""
											placeholder="Thành phố/ Tỉnh "
											value={formState.city}
											onChange={onFormStateChange}
										/>
										{error.city && (
											<label
												htmlFor="city"
												className="text-red-500"
											>
												Yêu cầu nhập
											</label>
										)}
									</div>
									<div className="">
										<input
											className="w-full border border-black rounded-lg p-2"
											type="text"
											name="strict"
											id=""
											placeholder="Quận"
											value={formState.strict}
											onChange={onFormStateChange}
										/>
										{error.strict && (
											<label
												htmlFor="strict"
												className="text-red-500"
											>
												Yêu cầu nhập
											</label>
										)}
									</div>
									<div className="">
										<input
											className="w-full border border-black rounded-lg p-2"
											type="text"
											name="guild"
											id=""
											placeholder="Phường  "
											value={formState.guild}
											onChange={onFormStateChange}
										/>
										{error.guild && (
											<label
												htmlFor="guild"
												className="text-red-500"
											>
												Yêu cầu nhập
											</label>
										)}
									</div>
									<div className="">
										<input
											className="w-full border border-black rounded-lg p-2"
											type="text"
											name="code"
											id=""
											placeholder="Mã bưu chính * "
											value={formState.code}
											onChange={onFormStateChange}
										/>
										{error.code && (
											<label
												htmlFor="code"
												className="text-red-500"
											>
												Yêu cầu nhập
											</label>
										)}
									</div>
								</div>
								<input
									className="w-full border border-black rounded-lg p-2"
									type="text"
									name="phoneNumber"
									id=""
									placeholder="Tòa nhà / Số tầng "
									value={formState.phoneNumber}
									disabled
									onChange={onFormStateChange}
								/>
								{error.phoneNumber && (
									<label
										htmlFor="phoneNumber"
										className="text-red-500"
									>
										Yêu cầu nhập
									</label>
								)}
							</form>
							<button
								className="border border-black rounded-md py-2 px-4 font-medium"
								onClick={() => onSubmit(index)}
							>
								Lưu
							</button>
							<button
								className="border border-black rounded-md py-2 px-4 ml-3 font-medium"
								onClick={() => {
									let newModels = [...isOpenEditModel]; // create a copy of the array
									newModels[index] = !isOpenEditModel[index];
									setisOpenEditModel(newModels);
								}}
							>
								Hủy
							</button>
						</div>
					</BoxModel>
					<div
						key={index}
						className="p-4"
					>
						<p className="text-md font-medium">{user.name}</p>
						<p className="text-sm">{item.street}</p>
						<p className="text-md">{item.building}</p>
						<p className="text-md">{item.city}</p>
						<p>{user.phoneNumber}</p>
						<div className="flex">
							<button
								className="cursor-pointer border border-black rounded-lg px-4 py-2 mr-4"
								onClick={() => {
									let newModels = [...isOpenEditModel]; // create a copy of the array
									newModels[index] = !isOpenEditModel[index];
									setisOpenEditModel(newModels);
								}}
							>
								Chỉnh sửa
							</button>
							<button
								onClick={() => onDelete(index)}
								className="cursor-pointer border border-black rounded-lg px-4 py-2 mr-4"
							>
								Xóa
							</button>
						</div>
					</div>
				</div>
			))} */}
			<div
				className="border border-gray-400 rounded-lg mt-4  flex flex-col justify-between py-2 px-2 cursor-pointer"
				onClick={() => {
					if (1 < 5) setIsOpenModel(!isOpenModel);
				}}
			>
				<p className="text-gray-400">Thêm địa chỉ</p>
				<p className=" rounded-lg text-gray-400">+</p>
			</div>
			<BoxModel
				isOpenModel={isOpenModel}
				setIsOpenModel={setIsOpenModel}
			>
				<div className="bg-white rounded-md w-1/2 h-screen p-6">
					<h1 className="text-xl font-bold text-center">Thêm địa chỉ mới</h1>
					<form
						action=""
						className="flex flex-col  justify-between h-[70%] my-6"
					>
						<input
							className="w-full border border-black rounded-lg p-2"
							type="text"
							name="fullName"
							id=""
							placeholder="Họ và tên"
							value={formState.fullName}
							onChange={onFormStateChange}
							disabled
						/>
						{error.fullName && (
							<label
								htmlFor="fullName"
								className="text-red-500"
							>
								Yêu cầu nhập
							</label>
						)}
						<input
							className="w-full border border-black rounded-lg p-2"
							type="text"
							name="street"
							id=""
							placeholder="Số nhà / Tên đường * "
							value={formState.street}
							onChange={onFormStateChange}
						/>
						{error.street && (
							<label
								htmlFor="street"
								className="text-red-500"
							>
								Yêu cầu nhập
							</label>
						)}
						<input
							className="w-full border border-black rounded-lg p-2"
							type="text"
							name="building"
							id=""
							placeholder="Tòa nhà / Số tầng "
							value={formState.building}
							onChange={onFormStateChange}
						/>
						{error.building && (
							<label
								htmlFor="building"
								className="text-red-500"
							>
								Yêu cầu nhập
							</label>
						)}
						<div className="grid grid-cols-2 gap-6">
							<div className="">
								<input
									className="w-full border border-black rounded-lg p-2"
									type="text"
									name="city"
									id=""
									placeholder="Thành phố/ Tỉnh "
									value={formState.city}
									onChange={onFormStateChange}
								/>
								{error.city && (
									<label
										htmlFor="city"
										className="text-red-500"
									>
										Yêu cầu nhập
									</label>
								)}
							</div>
							<div className="">
								<input
									className="w-full border border-black rounded-lg p-2"
									type="text"
									name="strict"
									id=""
									placeholder="Quận"
									value={formState.strict}
									onChange={onFormStateChange}
								/>
								{error.strict && (
									<label
										htmlFor="strict"
										className="text-red-500"
									>
										Yêu cầu nhập
									</label>
								)}
							</div>
							<div className="">
								<input
									className="w-full border border-black rounded-lg p-2"
									type="text"
									name="guild"
									id=""
									placeholder="Phường  "
									value={formState.guild}
									onChange={onFormStateChange}
								/>
								{error.guild && (
									<label
										htmlFor="guild"
										className="text-red-500"
									>
										Yêu cầu nhập
									</label>
								)}
							</div>
							<div className="">
								<input
									className="w-full border border-black rounded-lg p-2"
									type="text"
									name="code"
									id=""
									placeholder="Mã bưu chính * "
									value={formState.code}
									onChange={onFormStateChange}
								/>
								{error.code && (
									<label
										htmlFor="code"
										className="text-red-500"
									>
										Yêu cầu nhập
									</label>
								)}
							</div>
						</div>
						<input
							className="w-full border border-black rounded-lg p-2"
							type="text"
							name="phoneNumber"
							id=""
							placeholder="Tòa nhà / Số tầng "
							value={formState.phoneNumber}
							disabled
							onChange={onFormStateChange}
						/>
						{error.phoneNumber && (
							<label
								htmlFor="phoneNumber"
								className="text-red-500"
							>
								Yêu cầu nhập
							</label>
						)}
					</form>
					<button
						className="border border-black rounded-md py-2 px-4 font-medium"
						onClick={() => onSubmit()}
					>
						Thêm
					</button>
					<button
						className="border border-black rounded-md py-2 px-4 ml-3 font-medium"
						onClick={onCancel}
					>
						Hủy
					</button>
				</div>
			</BoxModel>
		</div>
	);
};

export default Address;
