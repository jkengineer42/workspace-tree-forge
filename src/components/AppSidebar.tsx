import { Settings, MessageSquare, LayoutDashboard, Package, HelpCircle, LogIn, BookOpen, MessageCircle } from "lucide-react";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const mainItems = [
  { title: "Preferences", url: "/dashboard", icon: Settings },
  { title: "Chat", url: "/chat", icon: MessageSquare },
  { title: "Dashboard", url: "/overview", icon: LayoutDashboard },
  { title: "Materials", url: "/materials", icon: Package },
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
          <SidebarMenuItem>
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
                  <HelpCircle className="h-4 w-4" />
                  <span>Help & Support</span>
                </button>
              </PopoverTrigger>
              <PopoverContent side="right" align="end" className="w-48 p-1 bg-card border border-border">
                <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-accent transition-colors">
                  <BookOpen className="h-4 w-4" />
                  <span>Help Center</span>
                </a>
                <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground hover:bg-accent transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  <span>Chat</span>
                </a>
              </PopoverContent>
            </Popover>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink
                to="/signin"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                activeClassName="bg-accent text-foreground font-medium"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign in</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
