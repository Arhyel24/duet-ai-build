"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Logout() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  }, []);

  return null; // or return a loading indicator, etc.
}
