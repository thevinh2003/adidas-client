import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import RedirectActive from "../apis/helpers/RedirectActive";
import RedirectForget from "../apis/helpers/RedirectForget";

const AuthRoute = () => {
	return (
		<Routes>
			<Route
				path="/*"
				element={<Home />}
				key="home"
			/>
			{/* private route */}
			<Route
				path="/login"
				element={<Login />}
			/>
			<Route
				path="/signup"
				element={<Signup />}
			/>
			<Route
				path="/detail/:id"
				element={<Detail />}
				key="detail"
			/>
			<Route
				path="/account/active"
				element={<RedirectActive />}
				key="detail"
			/><Route
			path="/account/forget"
			element={<RedirectForget />}
			key="detail"
		/>
		</Routes>
	);
};

export default AuthRoute;
