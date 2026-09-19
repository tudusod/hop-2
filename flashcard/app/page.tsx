"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "./_providers/UserContext";

export default function Home() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  console.log(user, 'user is on homepage')

  return (
    <>
      <div>home page</div>
      <div>
        {user && <div>{user.email}</div>}
      </div>
    </>
  );
}