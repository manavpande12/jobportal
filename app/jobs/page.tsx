import JobsView from "../../features/jobs/components/JobsView";

export default function JobsPage() {
    return (
        <div className="min-h-screen bg-card">
            <nav className="fixed top-0 z-40 flex items-center h-16 w-full gap-6 px-4 py-2 shrink-0 border-b bg-background/60 backdrop-blur-md supports-backdrop-filter:bg-background/5s0">
                <h1 className="gradient-text text-2xl sm:text-4xl font-black">Jobs</h1>
            </nav>
            <div className="flex-1 min-h-0 overflow-y-auto p-2 xl:p-4 mt-15">
                <JobsView />
            </div>
        </div >
    );
}