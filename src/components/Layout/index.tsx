import React, { PropsWithChildren } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Contact from "./Contact";
import Footer from "./Footer";

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<div className="min-h-screen overflow-hidden h-fit">
			<Header />
			<Navbar />
			{children}
			<Contact />
			<Footer />
		</div>
	);
};

export default Layout;
