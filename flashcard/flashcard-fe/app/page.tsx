"use client";

import { useRouter } from "next/navigation";
import { useUser } from "./_providers/UserContext";

type User = {
  email: string;
  token: string;
};

export default function Home() {
  const router = useRouter();
  const { user } = useUser(); 
  console.log(user, 'user is on homepage');

  return (
    <>
      <div>home page</div>
      <div>
        {user && <div>{user.email}</div>}
      </div>
    </>
  );
}