"use client";

import React, { useOptimistic, useRef, useEffect } from "react";
import { addPost } from "../actions/postsAction";
import PostsFormButton from "./postsFormButton";

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

type PostsFormProps = {
  posts: Post[];
};

const PostsForm: React.FC<PostsFormProps> = ({ posts }) => {
  const [formError, setFormError] = React.useState<string | null>(null);

  const ref = useRef<HTMLFormElement>(null);

  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    posts,
    (state, newPost: Post) => {
      return [newPost, ...state];
    }
  );

  useEffect(() => {
    if (formError) {
      const timer = setTimeout(() => setFormError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [formError]);

  return (
    <>
      <form
        ref={ref}
        action={async (formData) => {
          ref.current?.reset();

          addOptimisticPost({
            id: Math.random(), // Temporary ID for optimistic update
            title: formData.get("title") as string,
            body: formData.get("body") as string,
            userId: 1,
          });

          // Add timeout to simulate network latency for optimistic UI
          await new Promise((resolve) => setTimeout(resolve, 2000));

          const { error } = await addPost(formData);

          setFormError(error);
        }}
        className="py-4 mb-4 flex flex-col gap-2 md:flex-row"
      >
        <input
          type="text"
          name="title"
          placeholder="Post title..."
          className="border border-gray-300 rounded-md p-2"
        />

        <input
          type="text"
          name="body"
          placeholder="Post body..."
          className="border border-gray-300 rounded-md p-2"
        />

        <PostsFormButton />

        {formError && <p className="text-red-500 mt-4">{formError}</p>}
      </form>

      <ul className="flex flex-col gap-4">
        {optimisticPosts &&
          optimisticPosts.map((post: any) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
      </ul>
    </>
  );
};

export default PostsForm;
