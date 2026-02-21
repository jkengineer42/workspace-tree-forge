import { Settings, MessageSquare, LayoutDashboard, Package, HelpCircle, LogIn } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import MaterLogo from "@/components/MaterLogo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Preferences", url: "/dashboard", icon: Settings },
  { title: "Chat", url: "/chat", icon: MessageSquare },
  { title: "Dashboard", url: "/overview", icon: LayoutDashboard },
  { title: "Materials", url: "/materials", icon: Package },
];

const bottomItems = [
  { title: "Help & Support", url: "/help", icon: HelpCircle },
  { title: "Sign in", url: "/signin", icon: LogIn },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border bg-card">
      <div className="px-4 py-5">
        <MaterLogo />
      </div>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                      activeClassName="bg-accent text-foreground font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-2 pb-4">
        <SidebarMenu>
          {bottomItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.url}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                  activeClassName="bg-accent text-foreground font-medium"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
