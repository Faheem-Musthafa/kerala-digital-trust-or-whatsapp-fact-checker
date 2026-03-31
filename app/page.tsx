'use client';

import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    if (!message.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-lg mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Kerala Digital Trust
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
            WhatsApp Fact-Checker
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300">
          <div className="p-6 space-y-6">
            <div className="space-y-3">
              <label htmlFor="message-input" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Paste WhatsApp Forward Here
              </label>
              <textarea
                id="message-input"
                rows={6}
                className="block w-full rounded-xl border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500 sm:text-base outline-none transition-colors duration-200 resize-none"
                placeholder="Paste the suspicious message, link, or claim..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !message.trim()}
              className="w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-base font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98]"
            >
              {isAnalyzing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Message...
                </>
              ) : (
                'Analyze Message'
              )}
            </button>
          </div>
        </div>

        {/* Results Card Placeholder */}
        <div className={`transition-all duration-500 transform origin-top ${showResults ? 'opacity-100 scale-100 translate-y-0' : 'opacity-50 scale-95 -translate-y-4'}`}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-red-500"></div>
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Analysis Results</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Placeholder response</p>
                </div>
                {/* Score badge */}
                <div className="flex flex-col items-center justify-center bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-4 border border-orange-100 dark:border-orange-800/30">
                  <span className="text-3xl font-black text-orange-600 dark:text-orange-500">42</span>
                  <span className="text-xs font-semibold text-orange-600/80 dark:text-orange-500/80 uppercase tracking-wider mt-1">Trust Score</span>
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <h4 className="flex items-center text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Explanation
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                    This message contains several hallmarks of misinformation. The claims made about the incident have been debunked by multiple reputable sources. Moreover, the emotional language and urgent call to "forward this to everyone" are common tactics used in viral hoaxes.
                  </p>
                </div>
              </div>
            </div>
            {/* Results overlay for when it's just a placeholder and hasn't been submitted */}
            {!showResults && (
               <div className="absolute inset-0 bg-slate-50/60 dark:bg-slate-950/60 backdrop-blur-[2px] flex items-center justify-center z-10">
                 <p className="text-sm font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 py-2 px-4 rounded-full shadow-sm">
                   Paste a message to see analysis
                 </p>
               </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
