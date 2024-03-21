import React from "react";
import authAPI from "../authAPI";
import { useNavigate } from "react-router-dom";

const RedirectForget = () => {
    const navigate = useNavigate();
  React.useEffect(() => {
    const redirect = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get("email");
        const token = urlParams.get("token");
        if (email && token) {
          const response = await authAPI.verifyForgotPassword(email, token);
          if (response?.message === "Generated temp password successfully") {
            navigate(`/login?temp_password=${response.tempPassword}`);
          }
        }
    }
    redirect();
  }, [navigate]);
  return (
    <div className="mt-[100px] w-full h-[300px] text-center text-3xl">
      ĐANG CHUYỂN HƯỚNG
    </div>
  );
};

export default RedirectForget;
