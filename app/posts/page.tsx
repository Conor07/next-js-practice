import { revalidatePath } from "next/cache";
import React, { Suspense } from "react";
import PostsForm from "../components/postsForm";
import { PrismaClient } from "@/lib/generated/prisma";
import Link from "next/link";
import { Post } from "./[slug]/page";
import { createPost } from "../actions/actions";

const Posts: React.FC<{}> = async ({}) => {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
    next: { revalidate: 3600 },
  })
    .then((res) => res.json())
    .catch(() => {
      throw new Error("Failed to fetch posts");
    });

  const prisma = new PrismaClient();

  const dbPosts = await prisma.post.findMany({
    // where: {
    //   title: {
    //     endsWith: "post",
    //   },
    // },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      slug: true,
      content: true,
    },
  });

  const dbPostsCount = await prisma.post.count();
  return (
    <div className="p-4">
      <h1 className="mb-4">Posts</h1>

      {/* <Suspense
        fallback={<p className="w-full my-4 text-center">Loading posts...</p>}
      >
        <PostsForm posts={posts} />
      </Suspense> */}

      <Suspense
        fallback={<p className="w-full my-4 text-center">Loading posts...</p>}
      >
        <h1>All Posts ({dbPostsCount})</h1>

        <form action={createPost} className="flex flex-col gap-2">
          <input type="text" name="title" className="border-2" />
          <textarea name="content" className="border-2" id="" />

          <button type="submit" className="border-2 bg-gray-500">
            Create post
          </button>
        </form>

        <ul>
          {dbPosts.map((post: Post, idx) => {
            return (
              <li key={idx}>
                <Link href={`/posts/${post.slug}`}>{post.title}</Link>
              </li>
            );
          })}
        </ul>
      </Suspense>
    </div>
  );
};

export default Posts;
