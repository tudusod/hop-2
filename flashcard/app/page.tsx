'use client'
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter()
  const token = window.localStorage.getItem("token")
  if(!token) router.push("/signup")
  return (
    <div>
      hello
    </div>
  );
}
