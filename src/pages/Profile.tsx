import { FaAngleRight } from "react-icons/fa";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Forms from "../components/Forms";
import authAPI from "../apis/authAPI";

const Profile = () => {
  const [isOpenAddressSection, setIsOpenAddressSection] = useState(false);

  const onDelete = () => {
    window.location.href = "/";
  };

  const handleLogout = async() => {
    const res = await authAPI.logout();
    if(res.message === "Logout successfully") {
      window.location.href = "/";
    }
  }

  const handleDeleteAccount = async () => {
    const res = await authAPI.deleteAccount();
    if(res.message === "Logout successfully") {
      window.location.href = "/";
    }
  }

  return (
    <div className="px-[120px] m-[100px]">
      <h1 className="text-3xl font-bold mb-8">Tổng quản tài khoản</h1>
      <div className="flex">
        {/* left side */}
        <div className="flex flex-col w-1/3">
          <div className="bg-gray-200 rounded-lg p-6 w-full">
            <div
              className="flex justify-between items-center cursor-pointer font-semibold mb-3"
              onClick={() => setIsOpenAddressSection(false)}
            >
              Thông tin cá nhân
              <FaAngleRight />
            </div>
          </div>
          <button
            className="bg-black hover:opacity-90 text-white rounded-lg px-3 py-2 w-full text-center my-6"
            onClick={handleLogout}
          >
            Đăng xuất
          </button>
          <button
            className="bg-red-600 hover:opacity-90 text-white rounded-lg px-3 py-2 w-full text-center"
            onClick={handleDeleteAccount}
          >
            Xóa tài khoản
          </button>
        </div>
        {/* right side */}
        <Forms />
      </div>
    </div>
  );
};

export default Profile;
