import { Suspense } from "react";
import AboutSection from "@/components/AboutSection";
import CustomOrderSection from "@/components/CustomOrderSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import FeaturedProductsSkeleton from "@/components/FeaturedProductsSkeleton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>
      <AboutSection />
      <CustomOrderSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
}
