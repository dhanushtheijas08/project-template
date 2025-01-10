import { NavTypes } from "@/types";

export const authDetails = [
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "sara@gmail.com",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "********",
  },
];

export const navItems: NavTypes[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: "Home",
    allowedRoles: ["admin", "user"],
  },
  {
    href: "/dashboard/users",
    label: "Users",
    icon: "Users",
    allowedRoles: ["admin"],
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: "Settings",
    allowedRoles: ["admin"],
  },
];

export const userNavItems: NavTypes[] = [
  {
    href: "/dashboard/account",
    label: "Account",
    icon: "BadgeCheck",
    allowedRoles: ["admin", "user"],
  },
  {
    href: "/dashboard/billing",
    label: "Billing",
    icon: "CreditCard",
    allowedRoles: ["admin", "user"],
  },
  {
    href: "/dashboard/notifications",
    label: "Notifications",
    icon: "Bell",
    allowedRoles: ["admin", "user"],
  },
];
