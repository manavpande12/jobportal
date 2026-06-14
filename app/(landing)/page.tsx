import SolutionSection from "@/features/landing/components/SolutionSection";
import FaqSection from "@/features/landing/components/FaqSection";
import HeroSection from "@/features/landing/components/HeroSection";
import ProblemSection from "@/features/landing/components/ProblemSection";
import ActionSection from "@/features/landing/components/ActionSection";
import WhyChooseSection from "@/features/landing/components/WhyChooseSection";


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
}
export default Home;