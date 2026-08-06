import { Link, router, usePage } from '@inertiajs/react';
import { GraduationCap, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { getNavModules } from '@/lib/navigation';
import { ROLE_LABELS } from '@/lib/roles';
import { logout } from '@/routes';

export function AppSidebar() {
    const { props, url } = usePage();
    const { auth } = props;
    const navModules = getNavModules(auth.permissions);
    const role = auth.roles[0];

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard">
                                <GraduationCap className="size-5" />
                                <span className="font-semibold">Sekoliko</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Établissement</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navModules.map((module) => (
                                <SidebarMenuItem key={module.title}>
                                    {module.href ? (
                                        <SidebarMenuButton asChild isActive={url.startsWith(module.href)}>
                                            <Link href={module.href}>
                                                <module.icon />
                                                <span>{module.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    ) : (
                                        <SidebarMenuButton disabled tooltip={module.disabledReason ?? undefined}>
                                            <module.icon />
                                            <span>{module.title}</span>
                                        </SidebarMenuButton>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" onClick={() => router.post(logout.url())}>
                            <Avatar className="size-6">
                                <AvatarFallback className="text-xs">{auth.user?.name?.[0]}</AvatarFallback>
                            </Avatar>
                            <span className="flex flex-1 flex-col truncate text-left">
                                <span className="truncate">{auth.user?.name}</span>
                                {role && <span className="text-xs text-sidebar-foreground/60">{ROLE_LABELS[role] ?? role}</span>}
                            </span>
                            <LogOut className="size-4" />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
