"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Moon, Menu, X, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const route = [
    { label: "Overview", url: "/" },
    { label: "Jobs", url: "/jobs" },
    { label: "Pricing", url: "/pricing" },
    { label: "Contact", url: "/contact" },
    { label: "Sign In / Hire", url: "/login" },
];
const actionRoute = { label: "Sign In / Hire", url: "/login" };




const NavBar = ({ isTabs = true }) => {
    const path = usePathname();
    const [open, setOpen] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();
    const activeBox = "highlight-brand py-2 px-3 rounded-4xl";
    const inActiveBox = "bg-card/80 py-2 px-3 text-foreground rounded-4xl";
    const inActiveBoxHover = "hover:bg-card/80 hover:py-2 hover:px-3 hover:text-foreground! hover:rounded-4xl duration-300";
    const actionBtn = "bg-foreground py-2 px-3 text-background! rounded-4xl";
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === "dark";
    const modeIcon = mounted
        ? isDark
            ? <Sun className="size-5 md:size-6 text-primary" />
            : <Moon className="size-5 md:size-6 text-secondary" />
        : null;
    const modeText = mounted
        ? isDark ? "Light Mode" : "Dark Mode"
        : null;
    const modeChange = () => {
        setTheme(isDark ? "light" : "dark");
    };

    return (
        <nav className="fixed top-0 z-50 py-2 w-full flex gap-2 items-center justify-between px-4 md:px-12 animate-in slide-in-from-top duration-1000 border-b bg-background/80 backdrop-blur-4xl">
            {/* Logo */}
            <Link href={"/"} className="gradient-text text-2xl lg:text-4xl font-black">JobPortal</Link>

            {/* Desktop Menu */}
            {isTabs && <div className="hidden  md:flex w-full max-w-120 h-14 rounded-4xl border items-center justify-between bg-background/80 px-2 ">
                {route.map((item, idx) => (
                    <Link
                        key={item.label + idx}
                        href={item.url}
                        className={`${path === item.url ? activeBox : ""} font-semibold ${item.label === actionRoute.label ? actionBtn : ""
                            } ${inActiveBoxHover} `}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>}

            {/* Right Section */}
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    onClick={modeChange}
                    className={`h-12 w-12 md:h-14 md:w-14 bg-background/80 rounded-4xl ${isTabs ? "hidden" : ""} md:flex hover:scale-95 cursor-pointer`}
                >
                    {modeIcon ?? <div className="size-5 md:size-6" />}
                </Button>
                {/* Mobile Menu Button */}
                {isTabs &&
                    <>
                        <Link
                            href={actionRoute.url}
                            onClick={() => setOpen(false)}
                            className={`md:hidden font-semibold text-center ${actionRoute.label === actionRoute.label ? actionBtn : ""
                                }`}
                        >
                            {actionRoute.label}
                        </Link>


                        <Button
                            variant="outline"
                            className="md:hidden h-12 w-12 rounded-4xl "
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <X /> : <Menu />}
                        </Button></>
                }
            </div>

            {/* Mobile Menu */}
            {
                open && isTabs && (
                    <div className="absolute top-20 left-4 right-4 bg-background border rounded-3xl p-4 flex flex-col gap-3 md:hidden shadow-lg">
                        {route.slice(0, route.length - 1).map((item, idx) => (
                            <Link
                                key={item.label + idx}
                                href={item.url}
                                onClick={() => setOpen(false)}
                                className={`${path === item.url ? activeBox : inActiveBox} font-semibold text-center ${item.label === actionRoute.label ? actionBtn : ""
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Button onClick={modeChange} className="font-semibold rounded-4xl h-10">
                            {modeText ?? "Theme"}
                        </Button>
                    </div>
                )
            }
        </nav >
    );
};

export default NavBar;