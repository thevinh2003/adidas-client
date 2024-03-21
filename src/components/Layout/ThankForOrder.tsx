import React from "react";
import Navbar from "./Navbar";
import Contact from "./Contact";
import Footer from "./Footer";

function ThankForOrder() {
  return (
    <div>
      <Navbar />
      <div className="h-[450px] flex items-center">
        <div>
          <div className=" mb-5 mt-5 container">
            <p className="font-bold">Hoàn thành dặt hàng</p>
            <p>
              Bạn đã đặt hàng thành công - Bạn có thể theo dõi đơn hàng hoặc về
              trang chủ để tiếp tục mua sắm
            </p>
          </div>
          <div>
            <button className="bg-black mr-5 text-white hover:opacity-70 rounded-lg px-8 py-3 font-semibold mx-auto text-xl w-1/7 mb-4 cursor-pointer">
              Trang chủ
            </button>
            <button className="bg-black text-white hover:opacity-70 rounded-lg px-8 py-3 font-semibold mx-auto text-xl w-1/7 mb-4 cursor-pointer">
              Theo dõi đơn hàng
            </button>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </div>
  );
}

export default ThankForOrder;
