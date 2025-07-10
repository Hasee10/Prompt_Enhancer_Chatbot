import React from 'react';

export default function Sidebar({ chatHistory, selectedChatId, onSelectChat, onNewChat, onDeleteChat }) {
  return (
    <aside className="w-72 bg-sidebar-gradient bg-gradient-to-br text-cream flex flex-col p-4 rounded-tr-2xl rounded-br-2xl shadow-lg min-h-screen">
      {/* Logo and Title */}
      <div className="flex items-center gap-3 mb-8 mt-2 pl-1">
        {/* SVG Logo Placeholder */}
        <div className="w-9 h-9 bg-mint rounded-full flex items-center justify-center shadow-md">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#ffd7b3" />
            <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#234034" fontWeight="bold">A</text>
          </svg>
        </div>
        <span className="text-2xl font-bold tracking-tight text-cream">AIVA <span className="font-light">Chatbot</span></span>
      </div>
      <button
        className="mb-8 bg-mint text-deep-green font-semibold py-2 px-4 rounded-2xl hover:bg-pastel-green focus:ring-2 focus:ring-mint transition"
        onClick={onNewChat}
      >
        + New Chat
      </button>
      <div className="flex-1 space-y-8">
        {/* Chat history sections (all sessions) */}
        <div>
          <div className="text-xs uppercase text-pastel-green mb-2 tracking-wider">Chats</div>
          {chatHistory.map(chat => (
            <div
              key={chat.id}
              className={`flex items-center justify-between bg-olive rounded-xl p-3 mb-2 cursor-pointer transition outline-none ${selectedChatId === chat.id ? 'ring-2 ring-mint scale-105 bg-mint text-deep-green' : 'hover:bg-mint hover:text-deep-green focus:bg-mint focus:text-deep-green'}`}
              tabIndex={0}
              onClick={() => onSelectChat(chat.id)}
              onKeyDown={e => { if (e.key === 'Enter') onSelectChat(chat.id); }}
            >
              <span className="truncate max-w-[120px]">{chat.title || 'Untitled Chat'}</span>
              <button
                className="ml-2 text-xs text-olive bg-mint rounded-full w-6 h-6 flex items-center justify-center hover:bg-peach hover:text-deep-green transition"
                title="Delete chat"
                onClick={e => { e.stopPropagation(); onDeleteChat(chat.id); }}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
} 