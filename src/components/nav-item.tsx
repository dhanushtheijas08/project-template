"use client";

import { Icons } from "@/components/icons";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { NavTypes } from "@/types";
import Link from "next/link";

export const NavItem = ({ navItem }: { navItem: NavTypes }) => {
  const Icon = Icons[navItem.icon] || Icons.Settings;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link href={navItem.href} className="flex items-center">
          <Icon className="mr-2 h-4 w-4" />
          <span> {navItem.label} </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export const NavUserItem = ({ navItem }: { navItem: NavTypes }) => {
  const Icon = Icons[navItem.icon] || Icons.Settings;

  return (
    <DropdownMenuItem>
      <Icon />
      {navItem.label}
    </DropdownMenuItem>
  );
};
