"use client";

import { logout } from "@/lib/actions/auth";
import React from "react";

const SignOutButton = () => {
  return <button onClick={() => logout()}>Sign Out</button>;
};

export default SignOutButton;
