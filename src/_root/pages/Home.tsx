import { Models } from "appwrite";

import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";

export default function Home() {
	const { data: posts, isPending: isPostsLoading } = useGetRecentPosts();

	return (
		<div className="flex flex-1 ">
			<div className="home-container">
				<div className="home-posts">
					<h2 className="h3-bold md:h2-bold text-left w-full">New Feed</h2>

					{isPostsLoading && !posts ? (
						<Loader />
					) : (
						<ul className="flex flex-col flex-1 gap-9 w-full">
							{posts?.documents.map((post: Models.Document) => (
								<PostCard key={post.caption} post={post} />
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}
