import { Card, CardContent, CardFooter } from "@/common/components/ui/card";
import Image from "next/image";
import { solution } from "../constants/solutions";

const SolutionSection = () => {
    return (
        <section className="h-full bg-card pt-21 px-4 sm:px-12 flex flex-col justify-center">
            {/* Content */}
            <div className="space-y-2 sm:space-y-4 flex flex-col justify-center items-center">
                <h2 className="text-2xl text-center sm:text-5xl lg:text-[80px] font-black leading-none animate-in slide-in-from-left duration-500">
                    How We{" "}
                    <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-lg">
                        Solve This
                    </span>
                </h2>
                <p className="text-xs sm:text-sm md:text-xl font-semibold text-muted-foreground max-w-7xl mx-auto leading-relaxed  text-justify">
                    Finding a job should be <span className="highlight-brand px-1.5 rounded">easy and fast</span> not time consuming and repetitive.
                    With our flash process, you can simply join, search and start applying instantly in just
                    <span className="text-foreground font-medium">a few clicks.</span>.
                </p>
            </div>
            <div className="flex gap-4 2xl:gap-12 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 py-12 sm:justify-center overflow-visible group">
                {solution.map((item, idx) => (
                    <Card key={idx} size="sm" className="relative z-10 overflow-visible min-w-[85%] w-100 sm:min-w-44 aspect-square snap-center bg-background shadow hover:scale-110! group-hover:scale-95 group-active:scale-95 duration-300 ease-in-out active:scale-110!">
                        <div className="z-20 absolute -top-5 -translate-x-1/2 left-1/2 bg-radial from-primary from-60% to-secondary text-white rounded-full size-12 shadow text-xl font-bold flex justify-center items-center">
                            {idx + 1}
                        </div>
                        <CardContent className="p-0 flex justify-center">
                            <div className="relative w-48 h-48 aspect-square overflow-hidden rounded-2xl">
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-contain transition-all duration-300 ease-in-out select-none [user-drag:none] [-webkit-user-drag:none]"
                                    priority
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <h1 className="text-lg lg:text-2xl font-bold">
                                {item.label} <mark className="highlight-brand rounded">{item.highlight}</mark>
                            </h1>
                            <p className="text-xs lg:text-lg text-muted-foreground text-justify">
                                {item.desc}
                            </p>
                        </CardFooter>
                    </Card>
                ))}


            </div>
        </section>
    );
}
export default SolutionSection;