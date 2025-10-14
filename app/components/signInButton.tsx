"use client";

import { login } from "@/lib/actions/auth";
import React from "react";

const SignInButton = () => {
  return <button onClick={() => login()}>Sign In With Github</button>;
};

export default SignInButton;
