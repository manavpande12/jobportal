"use client";

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

type SidebarContextType = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    mounted: boolean;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState<boolean>(true);
    const [mounted, setMounted] = useState<boolean>(false);

    // persist in localStorage
    useEffect(() => {
        const stored = localStorage.getItem("sidebar_open");
        if (stored !== null) setOpen(stored === "true");
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem("sidebar_open", String(open));
        }
    }, [open, mounted]);

    return (
        <SidebarContext.Provider value={{ open, setOpen, mounted }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) throw new Error("useSidebar must be used within SidebarProvider");
    return context;
};