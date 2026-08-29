import { Calendar, Clock, Mail, Pen, User2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/common/components/ui/button";
import InfoItem from "@/common/components/info-item";
import { format } from "date-fns";
import { RecruiterProfileResponse } from "../../types/recruiter.types";



const ProfileSidebar = ({ data, onEdit }: { data: RecruiterProfileResponse; onEdit: () => void; }) => {
    return (
        <div className="h-full bg-background rounded-xl flex flex-col py-6 transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col items-center px-3 xl:px-6">
                <div className="rounded-full highlight-brand p-12 mt-6 mb-8 shadow">
                    <User2Icon className="w-16 h-16 fill-secondary stroke-none" />
                </div>

                <h1 className="text-2xl text-center font-bold">
                    {data.firstName ?? "No"} {data.lastName ?? "Name"}
                </h1>


                <span className="text-sm sm:text-lg text-muted-foreground text-center font-semibold max-w-88">
                    {data.designation ?? "~"}
                </span>

                <div className="w-full px-8">

                    <div className="h-0.5 bg-card mt-4 mb-8 w-full" />
                </div>
            </div>
            <div className="flex flex-col gap-6 px-3 xl:px-6">

                <InfoItem
                    Icon={Mail}
                    title="Email"
                    value={data.email}
                />
                <InfoItem
                    Icon={Calendar}
                    title="Created At"
                    value={
                        data.createdAt &&
                        format(new Date(data.createdAt), "dd MMM yyyy hh:mm a")
                    }
                />
                <InfoItem
                    Icon={Clock}
                    title="Last Updated"
                    value={
                        data.updatedAt &&
                        format(new Date(data.updatedAt), "dd MMM yyyy hh:mm a")
                    }
                />


                <Button
                    onClick={onEdit}
                    className="gradient-background font-semibold text-lg text-white hover:text-white gap-4 h-10!"
                    variant="outline"
                >
                    <Pen className="w-5! h-5!" />
                    <span>Edit Profile</span>
                </Button>

            </div>
        </div>
    );
}

export default ProfileSidebar;