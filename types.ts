export type Page = "home" | "upload" | "results" | "docs";

export interface AnalysisResult {
  category: string;
  confidence: number;
  ats: {
    score: number;
    found: string[];
    missing: string[];
  };
  grammar: {
    score: number;
    issues: string[];
    suggestions: string[];
  };
  resumeText: string;
}
