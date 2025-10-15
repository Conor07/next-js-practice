"use server";

import { PrismaClient } from "@/lib/generated/prisma";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const prisma = new PrismaClient();

  await prisma.post.create({
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
        .replace(/\s+/g, "-")
        .toLowerCase(),
      content: formData.get("content") as string,
    },
  });

  revalidatePath("/posts");
}

export async function editPost(formData: FormData, id: string) {
  const prisma = new PrismaClient();

  await prisma.post.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      slug: (formData.get("title") as string)
        .replace(/\s+/g, "-")
        .toLowerCase(),
      content: formData.get("content") as string,
    },
  });

  revalidatePath("/posts");
}

export async function deletePost(id: string) {
  const prisma = new PrismaClient();

  await prisma.post.delete({
    where: { id },
  });

  revalidatePath("/posts");
}
