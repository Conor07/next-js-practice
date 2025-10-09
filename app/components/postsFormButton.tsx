import React from "react";
import { useFormStatus } from "react-dom";

const PostsFormButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-500 text-white rounded-md py-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Add Post
    </button>
  );
};

export default PostsFormButton;
