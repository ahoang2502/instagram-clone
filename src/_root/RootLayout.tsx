import { Outlet } from "react-router-dom";

import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Topbar from "@/components/shared/Topbar";

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
