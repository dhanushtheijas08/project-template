"use client";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <DashboardSidebar />
        <SidebarInset className="flex-1 overflow-auto">
          <header className="flex w-full  h-16 items-center gap-4 border-b bg-background  px-4 py-4 sm:px-6">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">Dashboard</h1>
            <div className="ml-auto">
              <ThemeToggle />
            </div>
          </header>
          <main className="p-4 sm:p-6 md:p-8">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
