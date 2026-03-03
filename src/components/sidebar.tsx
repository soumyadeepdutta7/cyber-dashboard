"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FolderGit2,
    ScanSearch,
    Calendar,
    Bell,
    Settings,
    HelpCircle,
    Hexagon,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

const links = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/dashboard/projects", icon: FolderGit2 },
    { name: "Scans", href: "/dashboard/scans", icon: ScanSearch },
    { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
];

const bottomLinks = [
    { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
    { name: "Support", href: "/dashboard/support", icon: HelpCircle },
];

export function Sidebar() {
    const pathname = usePathname();

    // Highlight 'Scans' if underneath /dashboard/scans, else standard
    const isActive = (href: string) => {
        if (href === "/dashboard/scans" && pathname.startsWith("/dashboard/scans")) return true;
        return pathname === href;
    };

    return (
        <>
            <aside className="hidden md:flex fixed inset-y-0 left-0 z-10 w-[260px] flex-col border-r border-border bg-card">
                <div className="flex h-16 items-center gap-2 px-6">
                    <div className="flex size-8 items-center justify-center rounded-full bg-primary/20">
                        <Hexagon className="size-5 text-primary fill-primary" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-primary">aps</span>
                </div>

                <nav className="flex-1 space-y-1 px-4 py-4 overflow-y-auto">
                    {links.map((link) => {
                        const active = isActive(link.href);
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "group flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                                    active
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <link.icon className={cn("size-5", active ? "text-primary" : "text-muted-foreground")} />
                                {link.name}
                            </Link>
                        );
                    })}

                    <div className="my-6 border-t border-border mx-4" />

                    {bottomLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "group flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
                                pathname === link.href
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <link.icon className="size-5" />
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="border-t border-border p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between w-full bg-muted/50 p-1.5 rounded-lg border border-border/50">
                        <span className="text-xs font-semibold text-muted-foreground px-2">Theme</span>
                        <ThemeToggle />
                    </div>

                    <div className="flex items-center justify-between hover:bg-muted rounded-md p-2 transition-colors w-full group">
                        <div className="flex items-center gap-3 cursor-pointer overflow-hidden truncate">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-black font-semibold">
                                A
                            </div>
                            <div className="flex flex-col truncate">
                                <span className="text-sm font-medium leading-none truncate w-24">admin@edu.com</span>
                                <span className="text-xs text-muted-foreground mt-1 truncate">Security Lead</span>
                            </div>
                        </div>
                        <Link href="/login" className="text-muted-foreground hover:text-red-500 transition-colors p-1.5 rounded-md hover:bg-red-500/10 shrink-0" title="Log out">
                            <LogOut className="size-4" />
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Mobile Bottom Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border bg-card p-2 pb-safe">
                {links.map((link) => {
                    const active = isActive(link.href);
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "flex flex-col items-center p-2 text-[10px] font-medium transition-colors",
                                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <link.icon className="size-5 mb-1" />
                            <span className="truncate">{link.name}</span>
                        </Link>
                    );
                })}
                {/* Adding User Profile / Settings to mobile bar */}
                <Link
                    href="/dashboard/settings"
                    className={cn(
                        "flex flex-col items-center p-2 text-[10px] font-medium transition-colors cursor-pointer",
                        isActive("/dashboard/settings") ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-black font-semibold mb-1 text-xs">A</div>
                    <span className="truncate">Profile</span>
                </Link>
            </div>
        </>
    );
}
