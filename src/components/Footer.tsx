const Footer = () => (
  <footer className="border-t border-border bg-card py-8">
    <div className="medical-container text-center">
      <p className="text-sm text-muted-foreground mb-2">
        <strong>Medical Disclaimer:</strong> This tool provides AI-assisted screening for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.
      </p>
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} LungScreen AI — Powered by Google Gemini. Information referenced from Mayo Clinic guidelines.
      </p>
    </div>
  </footer>
);

export default Footer;
