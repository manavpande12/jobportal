import { features } from "../constants/why-choose-feature";

const WhyChooseSection = () => {
    return (
        <section className="py-20 px-4 sm:px-12 bg-background">
            <div className="max-w-7xl mx-auto text-center">

                {/* Heading */}
                <h2 className="text-2xl text-center sm:text-5xl lg:text-[80px] font-black leading-none animate-in slide-in-from-left duration-500">
                    Why Choose{" "}
                    <span className="gradient-text">JobPortal</span>
                </h2>


                {/* Features */}
                <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-12">
                    {features.map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center group">

                            {/* Circle Icon */}
                            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-105">
                                <item.icon className="w-12 h-12" />
                            </div>

                            {/* Title */}
                            <h3 className="mt-4 text-lg lg:text-2xl font-bold">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-xs lg:text-sm text-muted-foreground text-center max-w-40">
                                {item.desc}
                            </p>

                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
};

export default WhyChooseSection;