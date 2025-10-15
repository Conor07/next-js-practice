import React from "react";
import { PrismaClient } from "@/lib/generated/prisma";

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
}

const Post = async ({ params }: { params: { slug: string } }) => {
  const prisma = new PrismaClient();

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
