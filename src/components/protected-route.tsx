"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Spinner from "./spinner";
import Unauthorized from "./unauthorized";
import { UserType } from "@/types";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles: UserType[];
};

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/sign-in");
    }
    if (!loading && user && pathname === "/sign-in") {
      router.push("/dashboard");
    }
  }, [user, loading, allowedRoles, router, pathname]);

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return null;
  }
  if (!allowedRoles.includes(user.role)) return <Unauthorized />;
  return <>{children}</>;
};
