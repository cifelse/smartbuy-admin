"use client";

import React, { useEffect, useState } from "react";
import {
  ShoppingBag,
  PackageSearch,
  Users,
  Logs,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getMyInfo } from "@/lib/supabase/client";

const navigation = {
  user: {
    name: "Loading...",
    email: "Loading...",
    avatar: ""
  },
  platform: [
    {
      name: "Products",
      url: "/dashboard/products",
      icon: PackageSearch,
      disabled: true,
    },
    {
      name: "Users",
      url: "/dashboard/users",
      icon: Users,
      disabled: true,
    },
    {
      name: "Logs",
      url: "/dashboard/logs",
      icon: Logs,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userInfo = await getMyInfo();
      setUser(userInfo);
    };

    fetchUserInfo();
  }, []);

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <ShoppingBag className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">SmartBuy</span>
                  <span className="truncate text-xs">Admin Panel</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain navigations={navigation.platform} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user ?? navigation.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
