import { Activity, Search, Microscope, Stethoscope, Radiation, Pill, HeartPulse } from "lucide-react";

const infoSections = [
  {
    id: "about",
    title: "About Lung Cancer",
    icon: Activity,
    content: [
      "Lung cancer is a type of cancer that begins in the lungs. It is the leading cause of cancer deaths worldwide. People who smoke have the greatest risk, though lung cancer can also occur in people who have never smoked.",
      "The risk increases with the length of time and number of cigarettes smoked. Exposure to secondhand smoke, radon gas, asbestos, and other carcinogens also increases risk.",
    ],
    stats: [
      { label: "New cases annually (US)", value: "~238,000" },
      { label: "5-year survival (early stage)", value: "~63%" },
      { label: "Leading cause of cancer death", value: "#1 worldwide" },
    ],
  },
  {
    id: "diagnosis",
    title: "Diagnosis & Screening",
    icon: Search,
    items: [
      {
        icon: Microscope,
        title: "Imaging Tests",
        desc: "Chest X-rays and CT scans can reveal abnormal masses or nodules in the lungs. Low-dose CT screening is recommended for high-risk individuals.",
      },
      {
        icon: Stethoscope,
        title: "Sputum Cytology",
        desc: "Examination of mucus (sputum) under a microscope can sometimes reveal lung cancer cells, especially for centrally located tumors.",
      },
      {
        icon: Activity,
        title: "Biopsy",
        desc: "A tissue sample is collected via bronchoscopy, needle biopsy, or surgical biopsy to confirm the type and stage of lung cancer.",
      },
    ],
  },
  {
    id: "treatment",
    title: "Treatment Options",
    icon: Pill,
    items: [
      {
        icon: Radiation,
        title: "Radiation Therapy",
        desc: "Uses high-powered energy beams to kill cancer cells. May be used alone or combined with chemotherapy, before or after surgery.",
      },
      {
        icon: Pill,
        title: "Chemotherapy & Immunotherapy",
        desc: "Drug treatments that kill cancer cells or help your immune system fight cancer. Often used in combination for advanced stages.",
      },
      {
        icon: HeartPulse,
        title: "Surgery",
        desc: "Removal of cancerous tissue: wedge resection, lobectomy, or pneumonectomy depending on the tumor size and location.",
      },
    ],
  },
];

const InfoSections = () => (
  <div className="bg-muted">
    {infoSections.map((section) => (
      <section key={section.id} id={section.id} className="medical-section border-b border-border last:border-b-0">
        <div className="medical-container">
          <div className="flex items-center gap-3 mb-6">
            <section.icon className="w-6 h-6 text-primary" />
            <h2
              className="text-2xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {section.title}
            </h2>
          </div>

          {section.content && (
            <div className="max-w-3xl space-y-4 mb-8">
              {section.content.map((p, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          )}

          {section.stats && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {section.stats.map((stat, i) => (
                <div key={i} className="medical-card text-center">
                  <p className="text-2xl font-bold text-primary mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          {section.items && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {section.items.map((item, i) => (
                <div key={i} className="medical-card">
                  <item.icon className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    ))}
  </div>
);

export default InfoSections;
