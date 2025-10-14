"use client";

import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import React from "react";
import Image from "next/image";

const Header = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();

  const isLoggedIn = await isAuthenticated();

  const user = await getUser();
  return (
    <nav className="top-0 flex gap-4 p-4 mb-4 bg-gray-200 w-full">
      <Link href="/">Home</Link>

      <Link href="/users">Users</Link>

      <Link href="/posts">Posts</Link>

      {isLoggedIn && <LogoutLink className="ml-auto">Logout</LogoutLink>}

      {user ? (
        <>
          <Image
            className="rounded-full ml-auto"
            src={user.picture!}
            alt="User avatar"
            width={35}
            height={35}
          />

          <span>{user.email ?? ""}</span>
        </>
      ) : (
        "Not logged in"
      )}
    </nav>
  );
};

export default Header;
