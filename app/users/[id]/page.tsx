import React, { Suspense } from "react";
import { User } from "../page";

type UserDetailsProps = {
  params: {
    id: string;
  };
};

const UserDetails: React.FC<UserDetailsProps> = async ({ params }) => {
  const userDetails = async () => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users/${params.id}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch user details");
      }

      return res.json();
    } catch (error) {
      throw new Error("Failed to fetch user details");
    }
  };

  const user: User = await userDetails();

  return (
    <div>
      <h1>UserDetails</h1>

      <Suspense fallback={<p>Loading user details...</p>}>
        <p>User ID: {user.id}</p>

        <p>Name: {user.name}</p>

        <p>Email: {user.email}</p>
      </Suspense>
    </div>
  );
};

export default UserDetails;
