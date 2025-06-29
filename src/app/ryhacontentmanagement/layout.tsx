"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";

const menuItems = [
    { href: "/ryhacontentmanagement/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/ryhacontentmanagement/generate", label: "AI Generator", icon: Bot },
    { href: "/ryhacontentmanagement/posts", label: "Manage Posts", icon: Newspaper },
    { href: "/ryhacontentmanagement/scheduler", label: "Scheduler", icon: Clock },
    { href: "/ryhacontentmanagement/categories", label: "Categories", icon: FolderKanban },
    { href: "/ryhacontentmanagement/authors", label: "Authors", icon: Users },
    { href: "/ryhacontentmanagement/settings", label: "Settings", icon: Cog },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const authStatus = localStorage.getItem('ryha_auth') === 'true';
      setIsAuthenticated(authStatus);
      setIsLoading(false);
    }
  }, [isClient, pathname]);

  useEffect(() => {
    if (!isLoading && isClient) {
      if (!isAuthenticated && pathname !== '/ryhacontentmanagement/login') {
        router.push('/ryhacontentmanagement/login');
      }
      if (isAuthenticated && pathname === '/ryhacontentmanagement/login') {
        router.push('/ryhacontentmanagement/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, isClient, pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('ryha_auth');
    setIsAuthenticated(false);
    router.push('/ryhacontentmanagement/login');
  };
  
  if (isLoading || !isClient || (!isAuthenticated && pathname !== '/ryhacontentmanagement/login')) {
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-background">
            <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </div>
    );
  }

  if (pathname === '/ryhacontentmanagement/login') {
    return <>{children}</>;
  }

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
