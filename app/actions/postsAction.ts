"use server";

import { revalidatePath } from "next/cache";

export const addPost = async (data: FormData) => {
  const postTitle = data.get("title");
  const postBody = data.get("body");

  try {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: postTitle,
        body: postBody,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    revalidatePath("/posts"); // Revalidate the /posts path to fetch the updated list of posts

    return { error: null };
  } catch (e) {
    return { error: "Failed to add post" };
  }
};
