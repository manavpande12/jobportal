import ProfileInfo from "@/common/components/profile-info";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { JobSeekerProfileResponse } from "../../types/jobseeker.types";

const ProfileMeta = ({ data }: { data: JobSeekerProfileResponse }) => {
    return (
        <div className="bg-background flex-1 rounded-xl p-6 sm:p-10 flex sm:justify-evenly gap-4 flex-wrap transition-all duration-300 hover:shadow-lg">
            <ProfileInfo
                Icon={Calendar}
                title="Created At"
                value={
                    data.createdAt &&
                    format(new Date(data.createdAt), "dd MMM yyyy hh:mm a")
                }
            />
            <ProfileInfo
                Icon={Clock}
                title="Last Updated"
                value={
                    data.updatedAt &&
                    format(new Date(data.updatedAt), "dd MMM yyyy hh:mm a")
                }
            />
        </div>
    );
}
export default ProfileMeta;