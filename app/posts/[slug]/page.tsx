import React from "react";
import { PrismaClient } from "@prisma/client";
import { unstable_cache as cache } from "next/cache";

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
}

const prisma = new PrismaClient();

const getCachedPost = cache((slug) => {
  return prisma.post.findUnique({
    where: {
      slug,
    },
  });
});

const Post = async ({ params }: { params: { slug: string } }) => {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  return (
    <div>
      <h1>{post?.title}</h1>

      <p>{post?.content}</p>
    </div>
  );
};

export default Post;
