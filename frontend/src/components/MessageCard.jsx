import React from 'react';

// Simple markdown renderer for bold, bullets, and numbering
function renderMarkdown(text) {
  if (!text) return null;
  // Replace **bold**
  let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Replace numbered lists
  html = html.replace(/\n(\d+\..*)/g, '<br/>$1');
  // Replace bullets
  html = html.replace(/\n- (.*)/g, '<br/>• $1');
  // Replace newlines
  html = html.replace(/\n/g, '<br/>');
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function MessageCard({
  isBot = false,
  text = '',
  image = null,
  actions = [],
}) {
  return (
    <div className={`flex ${isBot ? 'items-start' : 'items-end justify-end'} w-full`}>
      {isBot && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-deep-green flex items-center justify-center text-cream font-bold text-xl mr-4 shadow-md">
          A
        </div>
      )}
      <div className={`max-w-xl ${isBot ? 'bg-soft-orange border-l-4 border-peach text-deep-green' : 'bg-white border-l-4 border-mint text-deep-green'} rounded-2xl shadow-lg p-5 flex flex-col space-y-3`}>
        {image && (
          <img src={image} alt="uploaded" className="w-32 h-32 object-cover rounded-xl mb-2 border-2 border-mint" />
        )}
        <div className="prose prose-sm max-w-none">
          {renderMarkdown(text)}
        </div>
        {isBot && actions && actions.length > 0 && (
          <div className="flex gap-2 pt-2">
            {actions.map((action, idx) => (
              <button key={idx} className="bg-mint text-deep-green rounded-2xl px-3 py-1 text-xs font-semibold hover:bg-pastel-green transition">
                {action}
              </button>
            ))}
          </div>
        )}
      </div>
      {!isBot && <div className="ml-4 w-10" />}
    </div>
  );
} 