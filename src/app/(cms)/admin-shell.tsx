"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Bot, Clock, Cog, FolderKanban, Home, LayoutDashboard, LogOut, Newspaper, ShieldCheck, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const menuItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/generate", label: "AI Generator", icon: Bot },
    { href: "/admin/posts", label: "Manage Posts", icon: Newspaper },
    { href: "/admin/scheduler", label: "Scheduler", icon: Clock },
    { href: "/admin/categories", label: "Categories", icon: FolderKanban },
    { href: "/admin/authors", label: "Authors", icon: Users },
    { href: "/admin/settings", label: "Settings", icon: Cog },
]

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };
  
  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <span className="font-headline text-lg font-semibold">Ryha</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map(item => (
                 <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)} tooltip={item.label}>
                        <Link href={item.href}>
                            <item.icon />
                            <span>{item.label}</span>
                        </Link>
                    </SidebarMenuButton>
                 </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Back to Site">
                        <Link href="/">
                            <Home />
                            <span>Back to Site</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
                        <LogOut />
                        <span>Logout</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-4">
                <SidebarTrigger />
            </div>
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
