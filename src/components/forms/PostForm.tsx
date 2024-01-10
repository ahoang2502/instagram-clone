import { zodResolver } from "@hookform/resolvers/zod";
import { Models } from "appwrite";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";

import { postValidation } from "@/lib/validation";
import FileUploader from "../shared/FileUploader";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useCreatePost } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { useToast } from "../ui/use-toast";

interface PostFormProps {
	post?: Models.Document;
}

const PostForm = ({ post }: PostFormProps) => {
	const { mutateAsync: createPost, isPending: isLoadingCreate } =
		useCreatePost();

	const { user } = useUserContext();
	const { toast } = useToast();
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof postValidation>>({
		resolver: zodResolver(postValidation),
		defaultValues: {
			caption: post ? post?.caption : "",
			file: [],
			location: post ? post?.location : "",
			tags: post ? post.tags.join(",") : "",
		},
	});

	const onSubmit = async (values: z.infer<typeof postValidation>) => {
		const newPost = await createPost({
			...values,
			userId: user.id,
		});

		if (!newPost) toast({ title: "Please try again!" });

		navigate("/");
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-9 w-full max-w-5xl "
			>
				{/* Caption */}
				<FormField
					control={form.control}
					name="caption"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="shad-form_label">Caption</FormLabel>

							<FormControl>
								<Textarea
									{...field}
									className="shad-textarea custom-scrollbar"
								/>
							</FormControl>

							<FormMessage className="shad-form_message" />
						</FormItem>
					)}
				/>

				{/* File */}
				<FormField
					control={form.control}
					name="file"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="shad-form_label">Add Photos</FormLabel>

							<FormControl>
								<FileUploader
									fieldChange={field.onChange}
									mediaUrl={post?.imageUrl}
								/>
							</FormControl>

							<FormMessage className="shad-form_message" />
						</FormItem>
					)}
				/>

				{/* Location */}
				<FormField
					control={form.control}
					name="location"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="shad-form_label">Add Location</FormLabel>

							<FormControl>
								<Input type="text" className="shad-input" {...field} />
							</FormControl>

							<FormMessage className="shad-form_message" />
						</FormItem>
					)}
				/>

				{/* Tags */}
				<FormField
					control={form.control}
					name="tags"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="shad-form_label">
								Add Tags (separated by comma " , ")
							</FormLabel>

							<FormControl>
								<Input
									type="text"
									className="shad-input"
									placeholder="Art, Expression, etc..."
									{...field}
								/>
							</FormControl>

							<FormMessage className="shad-form_message" />
						</FormItem>
					)}
				/>

				<div className="flex gap-4 items-center justify-end">
					<Button type="button" className="shad-button_dark_4">
						Cancel
					</Button>

					<Button
						type="submit"
						className="shad-button_primary whitespace-nowrap"
					>
						Submit
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default PostForm;
