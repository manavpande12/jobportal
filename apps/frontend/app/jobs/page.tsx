import JobsView from "../../features/jobs/components/JobsView";

export default function JobsPage() {
    return (
        <div className="min-h-screen bg-card mt-15">
            <div className="flex-1 min-h-0 overflow-y-auto p-2 xl:p-4">
                <JobsView />
            </div>
        </div>
    );
}