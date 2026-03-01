import { Stethoscope, Phone, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary">
        <div className="medical-container flex items-center justify-between py-2 text-primary-foreground text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5" />
            <span>Emergency: 911 | Helpline: 1-800-LUNG-USA</span>
          </div>
          <span className="hidden sm:block">Pulmonary Diagnostic Tool</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="medical-container flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
            <Stethoscope className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
              LungScreen
            </h1>
            <p className="text-xs text-muted-foreground">Pulmonary Diagnostic Platform</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#detection" className="text-foreground hover:text-primary transition-colors">Detection</a>
          <a href="#about" className="text-foreground hover:text-primary transition-colors">About Lung Cancer</a>
          <a href="#diagnosis" className="text-foreground hover:text-primary transition-colors">Diagnosis</a>
          <a href="#treatment" className="text-foreground hover:text-primary transition-colors">Treatment</a>
        </nav>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-card px-4 pb-4 flex flex-col gap-3 text-sm font-medium">
          <a href="#detection" className="py-2 text-foreground hover:text-primary" onClick={() => setMobileOpen(false)}>Detection</a>
          <a href="#about" className="py-2 text-foreground hover:text-primary" onClick={() => setMobileOpen(false)}>About Lung Cancer</a>
          <a href="#diagnosis" className="py-2 text-foreground hover:text-primary" onClick={() => setMobileOpen(false)}>Diagnosis</a>
          <a href="#treatment" className="py-2 text-foreground hover:text-primary" onClick={() => setMobileOpen(false)}>Treatment</a>
        </nav>
      )}
    </header>
  );
};

export default Header;
