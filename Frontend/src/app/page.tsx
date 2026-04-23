import CourseCategoriesSection from "@/components/CourseCategoriesSection";
import CTASection from "@/components/CTASection";
import FeaturedCoursesSection from "@/components/FeaturedCoursesSection";
import FeaturedInstructorsSection from "@/components/FeaturedInstructorsSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Page() {
  return (
<>
<Header/>
<HeroSection/>
<FeaturedCoursesSection/>
<CourseCategoriesSection/>
<FeaturedInstructorsSection/>
<TestimonialsSection/>
<CTASection/>
<Footer/>
</>
  );
}