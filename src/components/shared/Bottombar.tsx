import { Link, useLocation } from "react-router-dom";

import { bottombarLinks } from "@/constants";

const Bottombar = () => {
	const { pathname } = useLocation();

	return (
		<section className="bottom-bar">
			{bottombarLinks.map((link) => {
				const isActive = pathname === link.route;

				return (
					<Link
						key={link.label}
						to={link.route}
						className={`flex-center flex-col gap-1 p-2 transition ${
							isActive && "bg-primary-500 rounded-[10px]"
						}`}
					>
						<img
							src={link.imgURL}
							alt={link.label}
							width={25}
							height={25}
							className={` ${isActive && "invert-white"}`}
						/>
						<p className="tiny-medium text-light-2">{link.label}</p>
					</Link>
				);
			})}
		</section>
	);
};

export default Bottombar;
