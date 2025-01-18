/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const MainPage = () => {
  const { push } = useRouter();
  useEffect(() => {
    push("/sign-in");
  }, []);
  return null;
};

export default MainPage;
