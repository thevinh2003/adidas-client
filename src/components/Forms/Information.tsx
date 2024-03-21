import React, { useEffect, useState } from "react";
import ImportantTextBox from "../ImportantTextBox";
import DatePicker from "react-datepicker";
import authAPI from "../../apis/authAPI";

const Information = () => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const fetchUser = async () => {
      const data = await authAPI.getCurrentUser();
      setData(data?._user);
    };
    fetchUser();
  }, []);

  return (
    <div className="bg-gray-200 rounded-lg p-4 w-full ml-4">
      <h2 className="font-bold text-2xl">Thông tin của tôi</h2>
      <p className="text-sm my-2 mb-6">
        Hãy chỉnh sửa bất kỳ thông tin chi tiết nào bên dưới để tài khoản của
        bạn luôn được cập nhật.
      </p>
      <p className="mt-2 text-xl font-semibold mb-4">Thông tin cơ bản</p>
      {/* user information form */}
      <form className="flex flex-col">
        <div className="flex flex-col mb-4">
          <ImportantTextBox text="Họ và tên" htmlFor="name" />
          <input
            type="text"
            name="FullNameame"
            id=""
            className="rounded-lg bg-gray-100 px-2 py-2 mt-2"
            value={data?.FullName}
            onChange={(e) => console.log(e.target.value)}
          />
        </div>

        <div className="mt-4 flex flex-col flex-1">
          <ImportantTextBox text="Số điện thoại" />
          <input
            type="text"
            name="PhoneNumber"
            id=""
            className="rounded-lg bg-gray-100 px-2 py-2 mt-2"
            placeholder="Số điện thoại ..."
            value={data?.PhoneNumber}
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
        <h3 className="text-xl font-medium my-4 mt-6">Chi tiết đăng nhập.</h3>

        <div className="flex flex-col">
          <ImportantTextBox text="Email" htmlFor="email" />
          <input
            type="email"
            name="Email"
            id=""
            className="rounded-lg bg-gray-100 px-2 py-2 mt-2"
            value={data?.Email}
            onChange={(e) => console.log(e.target.value)}
          />
        </div>

        <div className="flex flex-col mt-6">
          <ImportantTextBox text="Mật khẩu" htmlFor="password" />
          <input
            type="password"
            name="Password"
            id=""
            className="rounded-lg bg-gray-100 px-2 py-2 mt-2"
            placeholder="Mật khẩu..."
            disabled
          />
        </div>
      </form>
    </div>
  );
};

export default Information;
