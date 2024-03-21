import Cookies from "js-cookie";
import HomeRoute from "./HomeRoute";
import AuthRoute from "./AuthRoute";
import Layout from "../components/Layout";

const Root = () => {
  const device = Cookies.get("_fr_device");
  return <Layout>{device ? <HomeRoute /> : <AuthRoute />}</Layout>;
};

export default Root;
