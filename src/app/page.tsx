"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/spinner";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/sign-in");
  }, [router]);

  return <Spinner />;
}
