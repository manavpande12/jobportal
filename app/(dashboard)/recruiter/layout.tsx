import SideBar from "@/common/components/sidebar";
import { SidebarProvider } from "@/common/provider/SidebarProvider";
import { RoleType } from "@/common/types/role.types";
import RecruiterNav from "../../../features/recruiter/components/profile-ui/RecruiterNav";

const RecruiterLayout = ({ children }: Readonly<{ children: React.ReactNode; }>) => {

    return (
        <SidebarProvider>
            <main className="flex h-screen overflow-hidden bg-card">
                <SideBar role={RoleType.RECRUITER} />
                <div className="flex-1 flex flex-col min-h-0 min-w-0">
                    <RecruiterNav />
                    <div className="flex-1 min-h-0 overflow-y-auto p-2 xl:p-4 mt-15">
                        {children}
                    </div>
                </div>
            </main>
        </SidebarProvider>
    )
}
export default RecruiterLayout;