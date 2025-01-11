"use client";
import { navItems } from "@/constant";
import { useAuth } from "@/context/AuthContext";
import { NavItem } from "@/components/nav-item";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarSeparator,
} from "@/components/ui/sidebar";

export const DashboardSidebar = () => {
  const { user } = useAuth();

  return (
    <Sidebar className="hidden border-r md:block">
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-semibold">MyApp Dashboard</h2>
      </SidebarHeader>
      <SidebarSeparator className="mx-0 mt-[3px]" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((navItem) => (
                <NavItem key={navItem.href} navItem={navItem} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {user && (
        <SidebarFooter className="border-t">
          <NavUser user={user} />
        </SidebarFooter>
      )}
    </Sidebar>
  );
};
