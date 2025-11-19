import AboutSection from "@/components/AboutSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturedProducts />
      <AboutSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
