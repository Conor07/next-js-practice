import { revalidatePath } from "next/cache";
import React from "react";
import PostsForm from "../components/postsForm";

const Posts: React.FC<{}> = async ({}) => {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch(() => {
      throw new Error("Failed to fetch posts");
    });

  return (
    <div className="p-4">
      <h1 className="mb-4">Posts</h1>

      <PostsForm posts={posts} />
    </div>
  );
};

export default Posts;
