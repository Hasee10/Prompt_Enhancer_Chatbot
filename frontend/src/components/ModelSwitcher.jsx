import React from 'react';

export default function ModelSwitcher({ models, currentModel, setCurrentModel }) {
  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-xs mx-auto relative">
      <label htmlFor="model-select" className="text-deep-green font-semibold text-base mb-1">Choose Model:</label>
      <div className="relative w-full">
        <select
          id="model-select"
          className="w-full px-4 py-2 rounded-2xl bg-olive text-cream font-semibold shadow-lg border-2 border-mint focus:ring-2 focus:ring-mint focus:outline-none transition appearance-none pr-10"
          value={currentModel}
          onChange={e => setCurrentModel(e.target.value)}
          style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
        >
          {models.map((model) => (
            <option key={model.key} value={model.key} className="text-deep-green bg-cream hover:bg-mint">
              {model.label}
            </option>
          ))}
        </select>
        {/* Custom arrow icon */}
        <div className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-mint">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
} 