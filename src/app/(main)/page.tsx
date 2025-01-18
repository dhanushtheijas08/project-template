/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Spinner from "@/components/spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const MainPage = () => {
  const { push } = useRouter();
  useEffect(() => {
    push("/sign-in");
  }, []);
  return <Spinner />;
};

export default MainPage;
