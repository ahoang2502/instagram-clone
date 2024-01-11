import React from "react";
import { Models } from "appwrite";

interface SearchResultsProps {
	isSearchFetching: boolean;
	searchedPosts: Models.Document[];
}

const SearchResults = ({
	isSearchFetching,
	searchedPosts,
}: SearchResultsProps) => {
	return <div>SearchResults</div>;
};

export default SearchResults;
