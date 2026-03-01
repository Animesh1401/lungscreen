import { useState, useCallback } from "react";
import { Upload, X, FileImage, Loader2 } from "lucide-react";
import { analyzeXray, type AnalysisResult } from "@/lib/gemini";
import AnalysisResults from "./AnalysisResults";

const XrayUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) {
      setError("Please upload a valid image file (JPEG, PNG, DICOM).");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setError(null);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const onSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  const analyze = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      const res = await analyzeXray(file);
      setResult(res);
    } catch (err) {
      setError("Analysis failed. Please check your connection and try again.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="detection" className="medical-section bg-background">
      <div className="medical-container">
        <div className="text-center mb-10">
          <h2
            className="text-2xl md:text-3xl font-bold text-foreground mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Upload Your X-Ray
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Upload a chest X-ray image for lung cancer screening and analysis.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {!file ? (
            <div
              className="upload-zone"
              onDrop={onDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <FileImage className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium text-foreground mb-2">
                Drag & drop your chest X-ray here
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Supports JPEG, PNG — PA or AP chest radiographs recommended
              </p>
              <label className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md font-semibold text-primary-foreground bg-primary hover:opacity-90 transition-opacity cursor-pointer">
                <Upload className="w-4 h-4" />
                Browse Files
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onSelect}
                />
              </label>
            </div>
          ) : (
            <div className="medical-card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <FileImage className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground text-sm">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={clearFile}
                  className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {preview && (
                <div className="rounded-md overflow-hidden border border-border mb-4" style={{ background: 'hsl(210, 30%, 10%)' }}>
                  <img
                    src={preview}
                    alt="Uploaded chest X-ray"
                    className="w-full max-h-96 object-contain"
                  />
                </div>
              )}

              {error && (
                <div className="rounded-md p-3 mb-4 text-sm border" style={{ background: 'hsl(0, 72%, 51%, 0.08)', borderColor: 'hsl(0, 72%, 51%, 0.3)', color: 'hsl(0, 72%, 45%)' }}>
                  {error}
                </div>
              )}

              {!result && (
                <button
                  onClick={analyze}
                  disabled={isAnalyzing}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold text-primary-foreground bg-primary hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing X-Ray...
                    </>
                  ) : (
                    "Analyze X-Ray"
                  )}
                </button>
              )}

              {result && <AnalysisResults result={result} onReset={clearFile} />}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default XrayUpload;
