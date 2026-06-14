import { JobSeekerProfileResponse } from "../../types/jobseeker.types";

const AboutSection = ({ data }: { data: JobSeekerProfileResponse }) => {
    return (
        <div className="bg-background flex-2 rounded-xl p-6 sm:p-10 transition-all duration-300 hover:shadow-lg">
            <h1 className="text-2xl font-bold my-4">About Me</h1>
            <p className="text-muted-foreground text-sm sm:text-lg font-semibold text-justify">{data.aboutMe ?? "No bio added yet."}</p>
        </div>
    );
}

export default AboutSection;