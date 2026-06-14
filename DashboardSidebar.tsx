"use client";

import { 
  Scissors, 
  History, 
  Settings, 
  LayoutDashboard, 
  LogOut, 
  Users 
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';

const navItems = [
  { icon: LayoutDashboard, label: 'Workspace', href: '/dashboard' },
  { icon: History, label: 'Activity Logs', href: '/dashboard/history' },
  { icon: Users, label: 'Team Hub', href: '/dashboard/team' },
];

const secondaryItems = [
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("user");
    // Using replace to prevent back navigation after logout
    router.replace('/signin');
  };

  return (
    <Sidebar className="border-r border-white/5 bg-[#0D121F]">
      <SidebarHeader className="p-4 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
            <Scissors className="w-5 h-5 text-white" />
          </div>
          <span className="font-headline font-bold text-white tracking-tight">Atomize PDF</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/40">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className={`w-4 h-4 ${pathname === item.href ? 'text-primary' : 'text-white/60'}`} />
                      <span className={pathname === item.href ? 'text-white' : 'text-white/60'}>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="text-white/40">Cloud Usage</SidebarGroupLabel>
          <SidebarGroupContent className="px-3 py-2">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-white/60">Storage</span>
                <span className="text-white">450MB / 1GB</span>
              </div>
              <Progress value={45} className="h-1 bg-white/10" />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild className="hover:bg-white/5 transition-colors">
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-white/60" />
                      <span className="text-white/60">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-white/5">
        <SidebarMenuButton 
          onClick={handleSignOut}
          className="w-full text-white/60 hover:text-white hover:bg-white/5 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
