import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import XrayUpload from "@/components/XrayUpload";
import InfoSections from "@/components/InfoSections";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <XrayUpload />
        <InfoSections />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
