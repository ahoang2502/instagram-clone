import React from "react";
import { Outlet } from "react-router-dom";

import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Bottombar from "@/components/shared/Bottombar";

export default function RootLayout() {
	return (
		<div className="w-full md:flex">
			<Topbar />
			<LeftSidebar />

			<section className="flex flex-1 h-full">
				<Outlet />
			</section>

			<Bottombar />
		</div>
	);
}
