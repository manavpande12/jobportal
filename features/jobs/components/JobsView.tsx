import JobList from "./JobList";
import JobsSearch from "./JobsSearch";

export default function JobsView() {
    return (
        <div className="flex min-h-[88vh] flex-col gap-4 bg-background rounded-xl overflow-hidden">
            <JobsSearch />
            <JobList />
        </div>
    );
}