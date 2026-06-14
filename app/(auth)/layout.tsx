import NavBar from "@/common/components/navbar";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <main className="h-screen flex flex-col">
            <NavBar isTabs={false} />
            <div className="flex-1 flex">
                {children}
            </div>
        </main>
    );
}