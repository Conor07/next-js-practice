import { revalidatePath } from "next/cache";
import React, { Suspense } from "react";
import PostsForm from "../components/postsForm";
import next from "next";

const Posts: React.FC<{}> = async ({}) => {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
    next: { revalidate: 3600 },
  })
    .then((res) => res.json())
    .catch(() => {
      throw new Error("Failed to fetch posts");
    });

  return (
    <div className="p-4">
      <h1 className="mb-4">Posts</h1>

      <Suspense
        fallback={<p className="w-full my-4 text-center">Loading posts...</p>}
      >
        <PostsForm posts={posts} />
      </Suspense>
    </div>
  );
};

export default Posts;
