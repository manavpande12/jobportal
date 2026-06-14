import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { ChevronRight, Hash, Search } from "lucide-react";
import Image from "next/image";
import { skills } from "../constants/skills";
import { popularSearches } from "../constants/search-titles";
const HeroSection = () => {
    return (
        <section className="relative z-0 min-h-screen bg-background px-4 sm:px-12 flex 2xl:flex-row flex-col">
            {/* Left Side */}
            <div className="flex flex-1 2xl:flex-2 justify-center flex-col">
                {/* Content */}
                <div className="space-y-2 sm:space-y-4">
                    <span className="bg-primary/10 text-secondary rounded-4xl px-4 py-2 text-xs sm:text-sm font-bold inline-block animate-in slide-in-from-left duration-300">
                        Find Opportunities | Grab It | Own It
                    </span>

                    <h1 className="text-2xl sm:text-5xl lg:text-[80px] font-black leading-none animate-in slide-in-from-left duration-500">
                        Discover Jobs
                    </h1>

                    <div className="flex gap-2 text-2xl sm:text-5xl lg:text-[80px] font-black leading-none animate-in slide-in-from-left duration-500">
                        <span>Build a</span>
                        <span className="gradient-text">
                            Better Future.
                        </span>
                    </div>

                    <p className="text-xs  sm:text-xl md:text-3xl font-semibold text-muted-foreground max-w-4xl leading-relaxed animate-in slide-in-from-left duration-600">
                        Explore thousands of job opportunities from top companies.
                        Whether you're starting your career or making a move.
                        Your next opportunity is here.
                    </p>
                </div>
                {/* Filter */}
                <div className="mt-4 p-0! w-full max-w-200 bg-background sm:h-16 rounded-4xl border flex items-center gap-2 animate-in slide-in-from-left duration-800">
                    <div className="relative flex-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 sm:size-5 text-muted-foreground" />
                        <Input
                            className="pl-10 h-8 sm:h-14 rounded-l-4xl text-xs sm:text-md border-none"
                            placeholder="Search Job Title, Keywords..."
                        />
                    </div>
                    <div className="relative flex-2 hidden sm:block">
                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                        <Select>
                            <SelectTrigger className="pl-10 h-14! w-full border-none" >
                                <SelectValue placeholder="Select Skill" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Skill</SelectLabel>
                                    {skills.map((skill, idx) => (
                                        <SelectItem key={skill + idx} value={skill}>{skill}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="relative flex-1">
                        <Button variant="outline" className="sm:h-14! w-full rounded-r-4xl gradient-background text-white text-xs sm:text-sm hover:text-white font-bold cursor-pointer hover:scale-95">
                            Search
                        </Button>
                        <ChevronRight className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 size-4 sm:size-6 text-white" />
                    </div>
                </div>
                <div className=" flex flex-wrap items-center gap-1.5 sm:gap-4 text-xs sm:text-lg font-semibold mt-4 animate-in slide-in-from-left duration-1000">
                    <h1 className="text-muted-foreground ">Popular Searches:</h1>
                    {popularSearches.map((value) => (
                        <span key={value} className="bg-background/80 border px-4 rounded-4xl font-semibold ">{value}</span>
                    ))}
                </div>
            </div>
            {/* Right Side */}
            <div className="flex flex-1 justify-center items-center 2xl:mt-0 mt-4">
                <div
                    className="relative w-full sm:max-w-200 2xl:max-w-180 aspect-square sm:aspect-video 2xl:aspect-square rounded-4xl overflow-hidden animate-in slide-in-from-bottom duration-1000"
                >
                    <Image
                        src="/job-search-dashboard.png"
                        alt="Job search platform dashboard showing job listings and career opportunities"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover grayscale-100 hover:scale-150 active:scale-150 ease-in-out duration-300 hover:grayscale-0 active:grayscale-0  select-none [user-drag:none] [-webkit-user-drag:none] rounded-4xl"
                        priority
                    />
                </div>
            </div>
        </section>
    );
}

export default HeroSection;