import SideBar from "@/common/components/sidebar";
import { SidebarProvider } from "@/common/provider/SidebarProvider";
import { RoleType } from "@/common/types/role.types";
import JobSeekerNav from "@/features/jobseeker/components/profile-ui/JobSeekerNav";

const JobSeekerLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {
    return (
        <SidebarProvider>
            <main className="flex h-screen overflow-hidden bg-card">
                <SideBar role={RoleType.JOB_SEEKER} />
                <div className="flex-1 flex flex-col min-h-0 min-w-0">
                    <JobSeekerNav />
                    <div className="flex-1 min-h-0 overflow-y-auto p-2 xl:p-4 mt-15">
                        {children}
                    </div>
                </div>
            </main>
        </SidebarProvider>
    )
}
export default JobSeekerLayout;