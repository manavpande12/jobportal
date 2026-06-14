import SkillBadgeList from "@/common/components/skill/SkillBadgeList";
import { JobSeekerProfileResponse } from "../../types/jobseeker.types";

const SkillsSection = ({ data }: { data: JobSeekerProfileResponse }) => {
    return (
        <div className="bg-background flex-2 rounded-xl p-6 sm:p-10 transition-all duration-300 hover:shadow-lg">
            <h1 className="text-2xl font-bold my-4">Skills</h1>
            <SkillBadgeList emptyMessage="No skills added yet." skills={data.skills} size="lg" />
        </div>
    );
}

export default SkillsSection;