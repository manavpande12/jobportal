"use client";
import { ChevronRight, Moon, Sidebar, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { RoleType } from "@/common/types/role.types";
import { GET_ROUTE_TABS, TabsTypes } from "@/config/routes";
import { useSidebar } from "../provider/SidebarProvider";
import { useIsMobile } from "../hooks/useMobile";

const themeOptions = [
    { key: "dark", icon: Moon },
    { key: "light", icon: Sun },
] as const;

const SideBar = ({ role }: { role: RoleType }) => {
    const data: TabsTypes[] = GET_ROUTE_TABS(role)
    const { resolvedTheme, setTheme } = useTheme();
    const pathname = usePathname();
    const router = useRouter();
    const { open, setOpen, mounted } = useSidebar();
    const isDark = mounted && resolvedTheme === "dark";
    const isMobile = useIsMobile();
    const isSidebarVisible = isMobile ? open : true;
    const isCollapsed = !isMobile && !open;
    useEffect(() => {
        if (isMobile && open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [open, isMobile]);
    if (!mounted) return null;
    return (
        <>
            {/* Overlay (only mobile + open) */}
            {isMobile && open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm opacity-100 transition-opacity duration-300"
                />
            )}
            <aside
                className={`
                ${isMobile ? "fixed z-50" : "sticky top-0"}
                ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"}
                ${isCollapsed ? "w-16 p-2" : "w-68 p-5"}
                bg-background/60 backdrop-blur-md supports-backdrop-filter:bg-background/80 border-r h-screen flex flex-col
                transition-all duration-300
            `}
            >
                <div className="flex justify-between items-center pb-2">
                    {open && <h1 className="gradient-text text-3xl font-black">JobPortal</h1>}
                    <Button variant="ghost" className="cursor-pointer hover:scale-95 duration-300" onClick={() => setOpen((prev) => !prev)}>
                        <Sidebar className="w-6! h-6! text-muted-foreground" />
                    </Button>
                </div>
                <div className="mt-6 flex flex-col flex-1 justify-between">
                    {/* Main Route */}
                    <div className="flex flex-col gap-y-2.5 text-sm font-medium">
                        {data.map((item, idx) => {
                            const active: boolean = pathname === item.path;
                            const Icon = item.icon;
                            if (item.hide) return;
                            return (
                                <div onClick={() => { router.push(item.path); setOpen(false); }} key={item.label + idx} className={`${active && open ? "bg-primary/10 font-bold" : " "} ${open ? " hover:bg-card hover:scale-95" : ""} relative p-2 rounded-xl flex gap-2 items-center cursor-pointer duration-300`}>
                                    <Icon className={`w-6 h-6 ${active ? "text-primary" : "text-muted-foreground"}`} />
                                    {open && <span className={active ? "text-primary" : "text-muted-foreground"}>{item.label}</span>}
                                    {active && open && <ChevronRight className="w-6 h-6 text-primary  absolute right-2 top-1/2 -translate-y-1/2" />}
                                </div>
                            )
                        })}
                    </div>
                    {/* Theme Toggle */}
                    <div className={`w-full bg-card flex gap-2 rounded-xl p-1 shadow ${isMobile ? "mb-10" : ""}`}>
                        {open && themeOptions.map((item) => {
                            const Icon = item.icon;
                            const active = isDark ? item.key === "dark" : item.key === "light";
                            return (
                                <div key={item.key} onClick={() => setTheme(item.key)} className={`flex-1 flex justify-center items-center rounded-xl p-1.5 cursor-pointer transition-transform duration-300 ${active ? "bg-background" : "bg-card"} hover:scale-95`}>
                                    <Icon className={`w-5 h-5 ${active ? "text-foreground" : "text-muted-foreground"}`} />
                                </div>
                            );
                        })}
                        {!open && (<div
                            onClick={() => setTheme(isDark ? "light" : "dark")}
                            className="w-full flex justify-center items-center rounded-xl p-2 cursor-pointer transition-transform duration-300 hover:scale-95"
                        >
                            {isDark && <Sun className="w-6 h-6 text-foreground" />}
                            {!isDark && <Moon className="w-6 h-6 text-foreground" />}

                        </div>)}
                    </div>

                </div>

            </aside>
        </>
    );
}

export default SideBar;