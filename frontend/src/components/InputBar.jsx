import React, { useState, useRef, useEffect } from 'react';

const PROMPT_TEMPLATES = [
  'Summarize this text:',
  'Translate to French:',
  'Rewrite for clarity:',
  'Make more concise:',
];

export default function InputBar({ onSend, onSearchOpen, searchOpen, searchQuery, setSearchQuery, onSearchClose }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [pro, setPro] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const textareaRef = useRef(null);
  const plusBtnRef = useRef(null);

  // Autosize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  // Close template menu on outside click
  useEffect(() => {
    function handleClick(e) {
      if (plusBtnRef.current && !plusBtnRef.current.contains(e.target)) {
        setShowTemplates(false);
      }
    }
    if (showTemplates) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showTemplates]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  const handleTemplateClick = (template) => {
    setInput(template + ' ');
    setShowTemplates(false);
    if (textareaRef.current) textareaRef.current.focus();
  };

  return (
    <div className="w-full">
      {/* Search bar modal/inline */}
      {searchOpen && (
        <div className="flex items-center mb-2 bg-mint/30 rounded-xl px-3 py-2 gap-2">
          <svg className="w-5 h-5 text-olive" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-deep-green placeholder:text-olive px-2"
            placeholder="Search chat messages..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            autoFocus
          />
          <button type="button" className="text-olive hover:text-peach transition" onClick={onSearchClose} title="Close search">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="6" y1="18" x2="18" y2="6" />
            </svg>
          </button>
        </div>
      )}
      <form className="flex flex-wrap items-center bg-white rounded-2xl shadow px-2 py-2 gap-2 sm:gap-4 w-full min-w-0" onSubmit={handleSubmit}>
        {/* Search and Plus buttons */}
        <div className="flex gap-1 sm:gap-2 mb-2 sm:mb-0">
          <button
            type="button"
            className="flex items-center px-2 py-1 rounded-lg border border-olive text-olive hover:bg-mint transition text-xs sm:text-sm"
            tabIndex={-1}
            onClick={onSearchOpen}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="font-medium">Search</span>
          </button>
          <div className="relative" ref={plusBtnRef}>
            <button
              type="button"
              className="flex items-center px-2 py-1 rounded-lg border border-olive text-olive hover:bg-mint transition text-xs sm:text-sm"
              tabIndex={-1}
              onClick={() => setShowTemplates(v => !v)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            {showTemplates && (
              <div className="absolute left-0 mt-2 z-10 bg-white border border-mint rounded-xl shadow-lg w-48">
                {PROMPT_TEMPLATES.map((tpl, idx) => (
                  <button
                    key={idx}
                    className="block w-full text-left px-4 py-2 text-deep-green hover:bg-mint/30 transition text-sm"
                    onClick={() => handleTemplateClick(tpl)}
                    type="button"
                  >
                    {tpl}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Pro toggle */}
        <div className="flex items-center gap-1 ml-2 mb-2 sm:mb-0">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={pro} onChange={() => setPro(!pro)} className="sr-only peer" />
            <div className="w-8 h-5 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-mint peer-checked:bg-mint transition-all"></div>
            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white border border-mint rounded-full transition-all peer-checked:translate-x-3"></div>
          </label>
          <span className="text-xs sm:text-sm font-semibold text-olive select-none">Pro</span>
        </div>
        {/* Input field and send button */}
        <div className="flex-1 min-w-[120px] flex items-center gap-2">
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="Type your prompt to improve..."
            className="flex-1 outline-none bg-transparent px-2 text-deep-green placeholder:text-olive text-sm sm:text-base min-w-0 resize-none overflow-hidden"
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={loading}
            style={{ maxHeight: '160px' }}
          />
          <button
            type="submit"
            className="bg-peach text-deep-green rounded-2xl px-4 sm:px-6 py-2 font-semibold hover:bg-soft-orange focus:ring-2 focus:ring-peach transition flex items-center gap-2 text-sm sm:text-base"
            disabled={loading || !input.trim()}
          >
            {/* Send icon (SVG) */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            Send
          </button>
        </div>
      </form>
    </div>
  );
} 