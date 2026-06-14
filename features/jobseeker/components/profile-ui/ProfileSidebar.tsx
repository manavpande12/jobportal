import { Briefcase, File, Mail, Pen, User2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/common/components/ui/button";
import ProfileInfo from "@/common/components/profile-info";
import { JobSeekerProfileResponse } from "../../types/jobseeker.types";



const ProfileSidebar = ({ data, onEdit }: { data: JobSeekerProfileResponse; onEdit: () => void; }) => {
    return (
        <div className="flex-1 bg-background rounded-xl flex flex-col py-6 transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-col items-center px-6">
                <div className="rounded-full highlight-brand p-12 mt-6 mb-8 shadow">
                    <User2Icon className="w-16 h-16 fill-secondary stroke-none" />
                </div>

                <h1 className="text-2xl text-center font-bold">
                    {data.firstName ?? "No"} {data.lastName ?? "Name"}
                </h1>


                <span className="text-sm sm:text-lg text-muted-foreground text-center font-semibold max-w-88">
                    {data.headline ?? "~"}
                </span>

                <div className="w-full px-8">

                    <div className="h-0.5 bg-card mt-4 mb-8 w-full" />
                </div>
            </div>
            <div className="flex flex-col gap-6 px-6">

                <ProfileInfo
                    Icon={Mail}
                    title="Email"
                    value={data.email}
                />

                <ProfileInfo
                    Icon={Briefcase}
                    title="Experience"
                    value={`${data.yearsOfExperience ?? 0} Years`}
                />

                <ProfileInfo
                    Icon={File}
                    title="Resume"
                    value={
                        <Link
                            href={data.resumeUrl ?? "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline"
                        >
                            Download
                        </Link>
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