export interface AnalysisResult {
  riskLevel: "low" | "moderate" | "high" | "critical";
  confidencePercent: number;
  findings: string[];
  summary: string;
  recommendation: string;
}

const analysisProfiles: AnalysisResult[] = [
  {
    riskLevel: "low",
    confidencePercent: 92,
    findings: [
      "No significant pulmonary masses or nodules identified",
      "Clear lung fields bilaterally",
      "Normal cardiac silhouette",
      "No pleural effusion detected",
      "Costophrenic angles are sharp",
    ],
    summary:
      "The chest radiograph appears within normal limits. No suspicious opacities, masses, or nodules are identified in either lung field. The mediastinal contours and cardiac silhouette are unremarkable.",
    recommendation:
      "No immediate follow-up required based on this screening. Continue routine annual screening if you are in a high-risk category (age 50–80, history of smoking). Consult your physician for personalized guidance.",
  },
  {
    riskLevel: "moderate",
    confidencePercent: 74,
    findings: [
      "Small indeterminate nodule (~6 mm) noted in the right upper lobe",
      "No calcification pattern within the nodule",
      "Mild peribronchial thickening observed",
      "No mediastinal lymphadenopathy",
      "No pleural effusion",
    ],
    summary:
      "A small indeterminate pulmonary nodule is identified in the right upper lobe measuring approximately 6 mm. While small nodules are common and often benign, the lack of calcification warrants follow-up imaging.",
    recommendation:
      "Follow-up low-dose CT scan recommended in 3–6 months to assess nodule stability per Fleischner Society guidelines. Consult a pulmonologist for further evaluation.",
  },
  {
    riskLevel: "high",
    confidencePercent: 85,
    findings: [
      "Spiculated mass (~22 mm) identified in the left upper lobe",
      "Associated mediastinal lymphadenopathy suspected",
      "Irregular borders with possible chest wall involvement",
      "Mild left-sided pleural effusion noted",
      "No contralateral lung abnormalities",
    ],
    summary:
      "A spiculated soft-tissue mass is identified in the left upper lobe measuring approximately 22 mm with irregular margins. Associated mediastinal widening suggests possible lymph node involvement. These findings are concerning for a primary pulmonary malignancy.",
    recommendation:
      "Urgent contrast-enhanced CT scan of the chest is strongly recommended. Referral to an oncologist and pulmonologist for tissue biopsy (CT-guided or bronchoscopic) should be arranged promptly.",
  },
  {
    riskLevel: "critical",
    confidencePercent: 91,
    findings: [
      "Large heterogeneous mass (~48 mm) in the right hilum with extension into the right upper lobe",
      "Significant mediastinal lymphadenopathy present",
      "Moderate right-sided pleural effusion",
      "Possible rib erosion at the 4th posterior rib",
      "Tracheal deviation noted toward the left",
    ],
    summary:
      "A large hilar mass with mediastinal lymphadenopathy and pleural effusion is identified, highly suspicious for advanced-stage bronchogenic carcinoma. There are signs of local invasion including possible rib involvement and tracheal deviation.",
    recommendation:
      "Immediate referral to an oncologist is critical. Contrast-enhanced CT of chest, abdomen, and pelvis along with PET-CT staging is recommended. Tissue diagnosis via biopsy should be obtained as soon as possible.",
  },
];

export async function analyzeXray(_file: File): Promise<AnalysisResult> {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 1500));

  // Return a random analysis profile
  const index = Math.floor(Math.random() * analysisProfiles.length);
  return analysisProfiles[index];
}
