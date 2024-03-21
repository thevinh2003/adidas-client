import React from "react";
import authAPI from "../authAPI";

const RedirectActive = () => {
  React.useEffect(() => {
    const isActive = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const email = urlParams.get("email");
      const token = urlParams.get("token");
      if (email && token) {
        const response = await authAPI.active(email, token);
        if (response?.message === "Activated successfully") {
          window.location.href = "/login?message=active_success";
        }
      }
    };
    isActive();
  }, []);
  return (
    <div className="mt-[100px] w-full h-[300px] text-center text-3xl">
      ĐANG CHUYỂN HƯỚNG
    </div>
  );
};

export default RedirectActive;
