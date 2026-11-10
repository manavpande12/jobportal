import SolutionSection from "@/features/landing/components/overview/SolutionSection";
import FaqSection from "@/features/landing/components/overview/FaqSection";
import HeroSection from "@/features/landing/components/overview/HeroSection";
import ProblemSection from "@/features/landing/components/overview/ProblemSection";
import ActionSection from "@/features/landing/components/overview/ActionSection";
import WhyChooseSection from "@/features/landing/components/overview/WhyChooseSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <WhyChooseSection />
      <FaqSection />
      <ActionSection />
    </>
  );
};
export default Home;
