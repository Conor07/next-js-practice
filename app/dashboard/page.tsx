import React from "react";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const { isAuthenticated } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    redirect("api/auth/login");
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
