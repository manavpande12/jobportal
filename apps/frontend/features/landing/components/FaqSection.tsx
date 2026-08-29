"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/common/components/ui/accordion";
import { faqs } from "@/features/landing/constants/faqs";
import Link from "next/link";

const FaqSection = () => {
    return (
        <section className="h-full bg-card py-26 px-4 sm:px-12 flex flex-col justify-center">
            <div className="max-w-7xl mx-auto w-full">

                {/* Header */}
                <div className="mb-12 flex flex-col justify-center items-center space-y-2 sm:space-y-4 ">
                    <h2 className="text-2xl sm:text-5xl text-center lg:text-[80px] font-black leading-none animate-in slide-in-from-left duration-500">
                        Frequently Asked{" "}
                        <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-lg">
                            Questions
                        </span>
                    </h2>
                    <p className="text-xs sm:text-sm md:text-xl font-semibold text-muted-foreground max-w-7xl mx-auto leading-relaxed  text-center">
                        Everything you need to know about how{" "}
                        <span className="highlight-brand font-medium rounded">JobPortal</span>{" "}
                        works and why it&apos;s built differently.
                    </p>
                </div>

                <Accordion type="single" className="flex flex-col gap-3">
                    {faqs.map((faq, i) => (
                        <AccordionItem
                            key={i}
                            value={`${i}`}
                            className="rounded-xl border border-border bg-background px-2 transition-colors duration-200 hover:border-secondary/30 data-open:border-primary"
                        >
                            <AccordionTrigger className="px-4 py-5 text-sm sm:text-lg font-medium hover:no-underline hover:text-secondary data-open:text-primary transition-colors duration-300">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="px-4 text-xs lg:text-lg text-muted-foreground text-justify leading-relaxed bg-card m-1.5 p-1.5 rounded data-open:font-semibold!">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                {/* CTA */}
                <p className="text-center text-xs lg:text-lg text-muted-foreground font-medium mt-10">
                    Still have questions?{" "}
                    <Link href="/contact" className="text-secondary font-medium hover:underline">
                        Contact us
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default FaqSection;