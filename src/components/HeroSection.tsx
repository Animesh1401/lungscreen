import heroXray from "@/assets/hero-xray.png";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden" style={{ background: 'hsl(210, 30%, 10%)' }}>
      <div className="absolute inset-0 opacity-30">
        <img
          src={heroXray}
          alt="Chest X-ray radiograph"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative medical-container py-16 md:py-24 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-6"
          style={{ background: 'hsl(210, 65%, 28%, 0.3)', color: 'hsl(210, 60%, 75%)' }}>
          AI-Assisted Screening
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
          style={{ fontFamily: 'var(--font-heading)', color: 'hsl(0, 0%, 96%)' }}>
          Lung Cancer Detection
        </h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
          style={{ color: 'hsl(210, 15%, 70%)' }}>
          Upload your chest X-ray for AI-powered analysis. Early detection can significantly improve treatment outcomes and survival rates.
        </p>
        <a
          href="#detection"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-md font-semibold text-primary-foreground bg-primary hover:opacity-90 transition-opacity"
        >
          Start Screening
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
