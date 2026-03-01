import { ShieldCheck, ShieldAlert, AlertTriangle, Shield, RotateCcw } from "lucide-react";
import type { AnalysisResult } from "@/lib/gemini";

const riskConfig = {
  low: {
    label: "Low Risk",
    icon: ShieldCheck,
    barColor: "hsl(145, 60%, 36%)",
    bgColor: "hsl(145, 50%, 95%)",
    textColor: "hsl(145, 60%, 25%)",
    borderColor: "hsl(145, 50%, 75%)",
  },
  moderate: {
    label: "Moderate Risk",
    icon: Shield,
    barColor: "hsl(38, 92%, 50%)",
    bgColor: "hsl(38, 80%, 95%)",
    textColor: "hsl(38, 80%, 30%)",
    borderColor: "hsl(38, 70%, 70%)",
  },
  high: {
    label: "High Risk",
    icon: AlertTriangle,
    barColor: "hsl(16, 85%, 45%)",
    bgColor: "hsl(16, 70%, 95%)",
    textColor: "hsl(16, 80%, 30%)",
    borderColor: "hsl(16, 60%, 70%)",
  },
  critical: {
    label: "Critical Risk",
    icon: ShieldAlert,
    barColor: "hsl(0, 72%, 51%)",
    bgColor: "hsl(0, 60%, 95%)",
    textColor: "hsl(0, 70%, 30%)",
    borderColor: "hsl(0, 50%, 70%)",
  },
};

interface Props {
  result: AnalysisResult;
  onReset: () => void;
}

const AnalysisResults = ({ result, onReset }: Props) => {
  const config = riskConfig[result.riskLevel];
  const Icon = config.icon;

  return (
    <div className="mt-6 space-y-5">
      {/* Risk banner */}
      <div
        className="rounded-md p-4 border flex items-center gap-4"
        style={{
          background: config.bgColor,
          borderColor: config.borderColor,
        }}
      >
        <Icon className="w-8 h-8 flex-shrink-0" style={{ color: config.barColor }} />
        <div className="flex-1">
          <p className="font-bold text-lg" style={{ color: config.textColor }}>
            {config.label}
          </p>
          <p className="text-sm" style={{ color: config.textColor, opacity: 0.8 }}>
            AI Confidence: {result.confidencePercent}%
          </p>
        </div>
      </div>

      {/* Confidence bar */}
      <div>
        <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
          <span>Detection Confidence</span>
          <span>{result.confidencePercent}%</span>
        </div>
        <div className="result-bar">
          <div
            className="result-bar-fill"
            style={{
              width: `${result.confidencePercent}%`,
              background: config.barColor,
            }}
          />
        </div>
      </div>

      {/* Summary */}
      <div>
        <h4
          className="font-semibold text-foreground mb-1.5 text-sm uppercase tracking-wide"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Summary
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{result.summary}</p>
      </div>

      {/* Findings */}
      <div>
        <h4
          className="font-semibold text-foreground mb-1.5 text-sm uppercase tracking-wide"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Findings
        </h4>
        <ul className="space-y-1.5">
          {result.findings.map((f, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: config.barColor }} />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Recommendation */}
      <div className="rounded-md p-4 border border-border bg-muted">
        <h4
          className="font-semibold text-foreground mb-1 text-sm uppercase tracking-wide"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Recommendation
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{result.recommendation}</p>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground italic border-t border-border pt-4">
        <strong>Disclaimer:</strong> This AI-assisted analysis is for informational purposes only and does not constitute a medical diagnosis. Always consult a qualified healthcare professional for proper evaluation and treatment decisions.
      </p>

      <button
        onClick={onReset}
        className="flex items-center gap-2 px-5 py-2.5 rounded-md font-medium text-sm border border-border bg-card hover:bg-muted transition-colors text-foreground"
      >
        <RotateCcw className="w-4 h-4" />
        Analyze Another X-Ray
      </button>
    </div>
  );
};

export default AnalysisResults;
