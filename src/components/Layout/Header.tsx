import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Header = () => {
  const device = Cookies.get("_fr_device");
  return (
    <div>
      <div className="bg-white flex justify-between px-[120px] items-center py-3">
        {device ?
          <Link to={"/follow"}>
            <p className="cursor-pointer select-none">Theo dõi đơn hàng</p>
          </Link> : <p className="cursor-pointer select-none">Chào mừng tới ADIDAS</p>
        }
        <p className="cursor-pointer">Trợ giúp</p>
      </div>
      <div className="bg-black text-white font-semibold flex justify-center py-3">
        Trả hàng dễ dàng
      </div>
    </div>
  );
};

export default Header;
