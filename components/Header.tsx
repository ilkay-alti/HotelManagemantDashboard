import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const HeaderComponent = async () => {
  const sesion = await auth();

  if (!sesion) redirect("/sign-in");
  return <div>HeaderComponent</div>;
};

export default HeaderComponent;
