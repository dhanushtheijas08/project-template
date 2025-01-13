import { z } from "zod";
import { authSchema, editUserSchema, userTypeSchema } from "@/schema";
import { Icons } from "@/components/icons";

export type AuthTypes = z.infer<typeof authSchema>;
export type UserType = z.infer<typeof userTypeSchema>;
export type IconName = keyof typeof Icons;
export type EditUserType = z.infer<typeof editUserSchema>;

export type AuthCardProps = {
  children: React.ReactNode;
  cardName: string;
  cardDescription?: string;
  type: "sign-in" | "sign-up";
};

export type NavTypes = {
  label: string;
  href: string;
  icon: IconName;
  allowedRoles: UserType[];
};

export type AuthUser = {
  uid: string;
  email: string | null;
  userToken: string | null;
  role: UserType;
  name?: string;
};

export type User = Omit<AuthUser, "userToken">;

export type UserWithId = Omit<User, "uid"> & { id: string };

export type AnalyticsType = {
  lastMonth: string;
  activeProjects: string;
  totalUsers: string;
  activeUsers: string;
};
