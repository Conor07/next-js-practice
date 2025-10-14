import { auth } from "@/auth";
import React from "react";
import Image from "next/image";
import SignOutButton from "../components/signOutButton";

const UserInfo = async () => {
  const session = await auth();

  return (
    <div>
      <h1>User Info</h1>

      <div className="">
        <p>
          Welcome, {session?.user?.name}, {session?.user?.email}
        </p>

        {session?.user?.image && (
          <Image
            className="rounded-full"
            src={session?.user?.image}
            alt="User Avatar"
            width={50}
            height={50}
          />
        )}
      </div>

      <SignOutButton />
    </div>
  );
};

export default UserInfo;
