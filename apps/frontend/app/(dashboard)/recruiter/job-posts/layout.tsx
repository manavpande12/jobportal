export default function JobPostLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="flex min-h-[88vh] flex-col">
            {children}
        </div>
    );
}