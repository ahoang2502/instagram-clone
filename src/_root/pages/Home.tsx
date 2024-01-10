import React from "react";

import Loader from "@/components/shared/Loader";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";

export default function Home() {
	const {
		data: posts,
		isPending: isPostsLoading,
		isError: isErrorPosts,
	} = useGetRecentPosts();

	return (
		<div className="flex flex-1 ">
			<div className="home-container">
				<div className="home-posts">
					<h2 className="h3-bold md:h2-bold text-left w-full">New Feed</h2>

					{isPostsLoading && !posts ? <Loader /> : <ul></ul>}
				</div>
			</div>
		</div>
	);
}
