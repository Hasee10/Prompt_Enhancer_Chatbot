import React from 'react';

export default function ContextPanel() {
  return (
    <aside className="w-80 bg-context-gradient bg-gradient-to-br text-deep-green flex flex-col items-center p-8 rounded-tl-2xl rounded-bl-2xl shadow-lg min-h-screen">
      <div className="w-full max-w-xs">
        <div className="flex items-center gap-2 mb-4">
          {/* Lightbulb icon */}
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-mint shadow">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-olive">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2a7 7 0 017 7c0 2.386-1.053 4.09-2.5 5.197V17a2 2 0 01-2 2h-3a2 2 0 01-2-2v-2.803C6.053 13.09 5 11.386 5 9a7 7 0 017-7z" />
            </svg>
          </span>
          <span className="font-bold text-lg">Prompt Improvement Tips</span>
        </div>
        <div className="bg-gradient-to-br from-mint via-pastel-green to-mint/80 rounded-2xl shadow-xl p-6">
          <ul className="space-y-3 list-disc list-inside">
            <li>Be specific about your goal or question.</li>
            <li>Include context or constraints if needed.</li>
            <li>Ask for examples or step-by-step reasoning.</li>
            <li>Clarify ambiguous terms or requirements.</li>
            <li>Use clear, concise language.</li>
          </ul>
          <div className="mt-6 text-sm text-olive">
            <strong>How it works:</strong> Paste your prompt on the left, and the bot will rewrite it to be clearer and more effective for AI models.
          </div>
        </div>
      </div>
    </aside>
  );
} 