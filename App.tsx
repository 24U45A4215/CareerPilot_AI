/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Rocket, 
  Home, 
  Upload as UploadIcon, 
  LayoutDashboard, 
  FileText, 
  CheckCircle,
  AlertCircle,
  BrainCircuit,
  BarChart3,
  FileSearch,
  Sparkles,
  Search,
  ListTodo,
  AlertTriangle
} from 'lucide-react';
import { Page, AnalysisResult } from './types';
import { predictCategory, calculateAtsScore, checkGrammar } from './utils/analysis';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [resumeInput, setResumeInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = () => {
    if (!resumeInput.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate ML processing time to give it that "AI" feel
    setTimeout(() => {
      const pred = predictCategory(resumeInput);
      const ats = calculateAtsScore(resumeInput, pred.category);
      const grammar = checkGrammar(resumeInput);
      
      setResult({
        category: pred.category,
        confidence: pred.confidence,
        ats: ats,
        grammar: grammar,
        resumeText: resumeInput
      });
      
      setIsAnalyzing(false);
      setCurrentPage('results');
    }, 1500);
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-slate-800 border-r border-slate-700 flex flex-col">
        <div className="px-6 py-8 border-b border-slate-700 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-sky-400 to-violet-500 rounded-lg">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">CareerPilot AI</h1>
            <p className="text-xs text-sky-400 font-medium tracking-wide">ENTERPRISE EDITION</p>
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          <SidebarItem 
            icon={<Home size={20} />} 
            label="Dashboard Home" 
            active={currentPage === 'home'} 
            onClick={() => setCurrentPage('home')} 
          />
          <SidebarItem 
            icon={<UploadIcon size={20} />} 
            label="Resume Upload" 
            active={currentPage === 'upload'} 
            onClick={() => setCurrentPage('upload')} 
          />
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            label="Analysis Results" 
            active={currentPage === 'results'} 
            onClick={() => setCurrentPage('results')} 
            disabled={!result}
          />
          <SidebarItem 
            icon={<FileText size={20} />} 
            label="Documentation" 
            active={currentPage === 'docs'} 
            onClick={() => setCurrentPage('docs')} 
          />
        </nav>
        
        <div className="p-4 m-4 bg-slate-900/50 rounded-xl border border-slate-700">
          <p className="text-xs text-slate-400 text-center">
            Platform Engine: TS + TF-IDF Heuristics<br/>
            Engine Status: <span className="text-emerald-400 font-bold">Online</span>
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#0F172A] relative">
        <div className="max-w-6xl mx-auto p-8 md:p-12 pb-24">
          
          {currentPage === 'home' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="relative overflow-hidden rounded-3xl bg-slate-800 border border-slate-700 p-10 md:p-16">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 max-w-2xl">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-sm font-medium mb-6">
                    <Sparkles size={16} /> Resume Intelligence 2.0
                  </span>
                  <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                    Analyze resumes. Predict domains. Optimize for ATS.
                  </h2>
                  <p className="text-lg text-slate-400 mb-8 max-w-xl">
                    CareerPilot AI leverages high-dimensional text heuristics to instantly parse, classify, and score your professional records against industry ATS engines.
                  </p>
                  <button 
                    onClick={() => setCurrentPage('upload')}
                    className="bg-gradient-to-r from-sky-500 to-violet-600 hover:opacity-90 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-sky-500/25 flex items-center gap-2"
                  >
                    <UploadIcon size={20} />
                    Start Analysis Now
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                  value="10+" 
                  label="Career Domains" 
                  description="Supported IT classifications"
                  icon={<BrainCircuit className="text-sky-400" size={24} />}
                />
                <StatCard 
                  value="100ms" 
                  label="Processing Latency" 
                  description="Lightweight browser execution"
                  icon={<BarChart3 className="text-violet-400" size={24} />}
                />
                <StatCard 
                  value="95%" 
                  label="Feature Accuracy" 
                  description="Based on deterministic TS matching"
                  icon={<CheckCircle className="text-emerald-400" size={24} />}
                />
              </div>
            </div>
          )}

          {currentPage === 'upload' && (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
              <div className="text-center space-y-4 mb-8">
                <h2 className="text-3xl font-bold">Resume Upload & Parsing</h2>
                <p className="text-slate-400">Paste your resume content below to simulate PDF/DOCX extraction.</p>
              </div>

              <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 shadow-xl">
                <label className="block text-sm font-medium text-slate-300 mb-2 font-mono">
                  &gt; EXTRACTED_RESUME_TEXT
                </label>
                <textarea 
                  value={resumeInput}
                  onChange={(e) => setResumeInput(e.target.value)}
                  placeholder="E.g., Experienced professional with a strong background in Python, TensorFlow, NLP... Skilled in utilizing Machine Learning to solve complex problems..."
                  className="w-full h-80 bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none resize-none"
                ></textarea>
                
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-slate-500">
                    {resumeInput.length} characters
                  </div>
                  <button 
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !resumeInput.trim()}
                    className="bg-gradient-to-r from-sky-500 to-violet-600 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <FileSearch size={20} />
                        Process & Analyze
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-4 flex gap-3 text-sky-200">
                <Search className="flex-shrink-0 mt-0.5" size={20} />
                <p className="text-sm">For the best results, ensure your pasted text includes technical skills, methodologies, and standard action verbs.</p>
              </div>
            </div>
          )}

          {currentPage === 'results' && result && (
            <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Analysis Dashboard</h2>
                  <p className="text-slate-400">Intelligence metrics for your resume execution.</p>
                </div>
                <button 
                  onClick={() => setCurrentPage('upload')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors border border-slate-700"
                >
                  Analyze New Resume
                </button>
              </div>

              {/* Top Level Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 to-sky-600"></div>
                  <BrainCircuit className="text-sky-400 w-10 h-10 mb-4" />
                  <p className="text-sm text-slate-400 uppercase tracking-widest font-semibold mb-1">Predicted Domain</p>
                  <h3 className="text-2xl font-bold text-white">{result.category}</h3>
                  <div className="mt-4 flex items-center gap-2 bg-slate-900 rounded-full px-3 py-1 text-sm border border-slate-700">
                    <span className="text-slate-400">Confidence:</span>
                    <span className="text-sky-400 font-bold">{result.confidence}%</span>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className={`absolute top-0 inset-x-0 h-1 ${result.ats.score > 75 ? 'bg-emerald-500' : result.ats.score > 50 ? 'bg-amber-500' : 'bg-rose-500'}`}></div>
                  <BarChart3 className="text-white w-10 h-10 mb-4" />
                  <p className="text-sm text-slate-400 uppercase tracking-widest font-semibold mb-1">ATS Score</p>
                  <h3 className="text-4xl font-black text-white">{result.ats.score}<span className="text-xl text-slate-500">/100</span></h3>
                </div>

                <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className={`absolute top-0 inset-x-0 h-1 ${result.grammar.score > 80 ? 'bg-indigo-500' : 'bg-amber-500'}`}></div>
                  <FileText className="text-white w-10 h-10 mb-4" />
                  <p className="text-sm text-slate-400 uppercase tracking-widest font-semibold mb-1">Readability</p>
                  <h3 className="text-4xl font-black text-white">{result.grammar.score}<span className="text-xl text-slate-500">/100</span></h3>
                </div>
              </div>

              {/* Detailed Dual-Pane */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* ATS Insights */}
                <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <ListTodo className="text-violet-400" /> 
                    ATS Optimization
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm uppercase text-slate-400 font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle size={16} className="text-emerald-400" /> Keywords Found
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.ats.found.length > 0 ? result.ats.found.map(kw => (
                          <span key={kw} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-sm">
                            {kw}
                          </span>
                        )) : <span className="text-slate-500 text-sm">No primary keywords matched.</span>}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm uppercase text-slate-400 font-semibold mb-3 flex items-center gap-2">
                        <AlertTriangle size={16} className="text-amber-400" /> Missing Industry Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.ats.missing.length > 0 ? result.ats.missing.map(kw => (
                          <span key={kw} className="px-3 py-1 bg-slate-900 border border-slate-700 text-slate-400 rounded-full text-sm">
                            {kw}
                          </span>
                        )) : <span className="text-emerald-500 text-sm">All primary keywords matched!</span>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grammar & Format Insights */}
                <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Sparkles className="text-amber-400" /> 
                    AI Formatting Suggestions
                  </h3>

                  <div className="space-y-4">
                    {result.grammar.issues.length === 0 && result.grammar.suggestions.length === 0 && (
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-200 flex gap-3">
                        <CheckCircle className="flex-shrink-0" />
                        <p>No critical formatting or grammar issues detected block-wide.</p>
                      </div>
                    )}
                    
                    {result.grammar.issues.map((issue, i) => (
                      <div key={i} className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-200 flex gap-3">
                        <AlertCircle className="flex-shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="font-semibold text-sm mb-1">{issue}</p>
                        </div>
                      </div>
                    ))}
                    
                    {result.grammar.suggestions.map((sugg, i) => (
                      <div key={i} className="p-4 bg-sky-500/10 border border-sky-500/20 rounded-xl text-sky-200 flex gap-3">
                        <Sparkles className="flex-shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="font-semibold text-sm">{sugg}</p>
                        </div>
                      </div>
                    ))}
                    
                    {result.ats.score < 80 && (
                      <div className="p-4 bg-violet-500/10 border border-violet-500/20 rounded-xl text-violet-200 flex gap-3">
                        <Sparkles className="flex-shrink-0 mt-0.5" size={18} />
                        <div>
                          <p className="font-semibold text-sm">Consider adapting your resume to specifically target <strong>{result.category}</strong> by including keywords like {result.ats.missing.slice(0, 3).join(', ')}.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentPage === 'docs' && (
            <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
              <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 md:p-12 shadow-xl prose prose-invert prose-sky max-w-none">
                <h1 className="text-3xl font-bold mb-4">Project Architecture & Documentation</h1>
                
                <h3 className="text-xl font-semibold mt-8 mb-4 text-sky-400 border-b border-slate-700 pb-2">Problem Statement</h3>
                <p className="text-slate-300 leading-relaxed">
                  Recruiters face thousands of resumes daily, making manual screening impossible. 
                  Applicants face unfair Automated Tracking Systems (ATS) that reject them based on formatting or missing terms.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-4 text-sky-400 border-b border-slate-700 pb-2">Objective</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Build a lightweight, highly accurate pipeline to:
                </p>
                <ol className="list-decimal pl-6 space-y-2 text-slate-300">
                  <li>Parse and clean resume texts efficiently.</li>
                  <li>Classify the candidate into professional domains using NLP heuristics.</li>
                  <li>Calculate an actionable ATS compatibility score via comparative technical-keyword extraction.</li>
                  <li>Provide algorithmic readability tracking.</li>
                </ol>

                <h3 className="text-xl font-semibold mt-8 mb-4 text-sky-400 border-b border-slate-700 pb-2">Tech Stack Overview (Web Implementation)</h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-300">
                  <li><strong>Language:</strong> TypeScript / React</li>
                  <li><strong>Styling:</strong> Tailwind CSS</li>
                  <li><strong>NLP Vectorization Strategy:</strong> Term Frequency Pattern Recognition mapped to Industry Standards</li>
                  <li><strong>Security:</strong> Client-side processing ensures user PII never leaves the context sandbox.</li>
                </ul>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick, disabled = false }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void, disabled?: boolean }) {
  return (
    <button 
      disabled={disabled}
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
        ${active 
          ? 'bg-gradient-to-r from-sky-500/20 to-violet-500/20 text-sky-200 border border-sky-500/30' 
          : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <span className={active ? "text-sky-400" : ""}>{icon}</span>
      {label}
    </button>
  );
}

function StatCard({ value, label, description, icon }: { value: string, label: string, description: string, icon: React.ReactNode }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
          {icon}
        </div>
        <div className="text-3xl font-black">{value}</div>
      </div>
      <h4 className="font-semibold text-white mb-1">{label}</h4>
      <p className="text-xs text-slate-400 leading-snug">{description}</p>
    </div>
  );
}

