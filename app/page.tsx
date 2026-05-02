import AboutSection from "@/components/AboutSection";
import CustomOrderSection from "@/components/CustomOrderSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturedProducts />
      <AboutSection />
      <CustomOrderSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
}
