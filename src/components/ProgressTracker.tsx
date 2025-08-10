import React, { useState, useEffect } from 'react';
import { CheckCircle, ChevronUp, ChevronDown } from 'lucide-react';

const STEPS = [
  { key: 'github', label: 'GitHub Setup' },
  { key: 'linkedin', label: 'LinkedIn Profile' },
  { key: 'portfolio', label: 'Portfolio Site' },
  { key: 'resume', label: 'Resume Tips' },
];

const STORAGE_KEY = 'firstpush_progress';

const getInitialProgress = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { github: false, linkedin: false, portfolio: false, resume: false };
};

const ProgressTracker: React.FC = () => {
  const [progress, setProgress] = useState(getInitialProgress());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const toggleStep = (key: string) => {
    setProgress((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed z-50 bottom-6 right-6 flex flex-col items-end">
      <button
        className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:scale-105 transition-transform font-semibold"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Hide Progress Tracker' : 'Show Progress Tracker'}
      >
        <span className="mr-2">Your Progress</span>
        {open ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
      </button>
      {open && (
        <div className="w-64 mt-3 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 animate-fadeIn">
          <h4 className="text-lg font-bold mb-3 text-gray-900">Journey Checklist</h4>
          <ul className="space-y-3">
            {STEPS.map((step) => (
              <li key={step.key} className="flex items-center justify-between group">
                <button
                  className={`flex-1 text-left px-2 py-1 rounded-lg transition-colors duration-200
                    ${progress[step.key] ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:bg-blue-50'}`}
                  onClick={() => toggleStep(step.key)}
                >
                  {step.label}
                </button>
                {progress[step.key] && (
                  <CheckCircle className="w-5 h-5 text-green-500 ml-2 animate-bounceIn" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      <style>{`
        @keyframes bounceIn {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); }
        }
        .animate-bounceIn { animation: bounceIn 0.4s; }
        .animate-fadeIn { animation: fadeIn 0.3s; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ProgressTracker; 