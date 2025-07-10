import React from 'react';

export default function ContextPanel() {
  return (
    <aside className="w-80 bg-context-gradient bg-gradient-to-br text-deep-green flex flex-col items-center p-8 rounded-tl-2xl rounded-bl-2xl shadow-lg min-h-screen">
      <div className="w-full max-w-xs">
        <div className="flex items-center gap-2 mb-4">
          {/* Link icon */}
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-mint shadow">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-olive">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 010 5.656m-3.656-3.656a4 4 0 015.656 0m-7.07 7.07a4 4 0 010-5.656m3.656 3.656a4 4 0 01-5.656 0" />
            </svg>
          </span>
          <span className="font-bold text-lg">Links to Document and Website</span>
        </div>
        <div className="bg-gradient-to-br from-mint via-pastel-green to-mint/80 rounded-2xl shadow-xl p-6">
          <ul className="space-y-3">
            <li><a href="#" className="underline decoration-2 underline-offset-4 hover:text-olive transition">Link to website</a></li>
            <li><a href="#" className="underline decoration-2 underline-offset-4 hover:text-olive transition">Link to document file</a></li>
          </ul>
        </div>
      </div>
    </aside>
  );
} 