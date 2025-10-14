"use server";

import { auth } from "@/auth";
import { Sign } from "crypto";
import SignInButton from "./components/signInButton";
import Image from "next/image";
import Link from "next/link";
import SignOutButton from "./components/signOutButton";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default async function Home() {
  const session = await auth();

  return (
    <main>
      <h1>Home</h1>

      {session?.user ? (
        <div>
          <Link href="/userInfo">User Info</Link>

          <SignOutButton />
        </div>
      ) : (
        <div className="">
          <p>You are not signed in</p>

          <SignInButton />
        </div>
      )}

      <LoginLink>Login</LoginLink>

      <RegisterLink>Sign up</RegisterLink>
    </main>
  );
}
