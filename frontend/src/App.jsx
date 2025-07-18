import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatThread from './components/ChatThread';
import ModelSwitcher from './components/ModelSwitcher';
import InputBar from './components/InputBar';
import ContextPanel from './components/ContextPanel';

const MODELS = [
  { key: 'tinyllama', label: 'TinyLlama' },
  { key: 'phi3', label: 'Phi-3' },
];

const STORAGE_KEY = 'aiva_chatbot_sessions';

function loadSessions() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return [];
}

function saveSessions(sessions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

function createNewSession() {
  return {
    id: Date.now(),
    title: '',
    messages: [],
    created: new Date().toISOString(),
  };
}

export default function App() {
  const [currentModel, setCurrentModel] = useState(MODELS[0].key);
  const [sessions, setSessions] = useState(() => loadSessions());
  const [selectedChatId, setSelectedChatId] = useState(() => {
    const loaded = loadSessions();
    return loaded.length > 0 ? loaded[0].id : null;
  });
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    saveSessions(sessions);
  }, [sessions]);

  const currentSession = sessions.find(s => s.id === selectedChatId);
  const messages = currentSession ? currentSession.messages : [];

  // Filter messages if search is active
  const filteredMessages = searchQuery.trim()
    ? messages.filter(m => m.text && m.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : messages;

  // Handle chat selection from sidebar
  const handleSelectChat = (chatId) => {
    setSelectedChatId(chatId);
  };

  // Handle new chat
  const handleNewChat = () => {
    const newSession = createNewSession();
    setSessions(prev => [newSession, ...prev]);
    setSelectedChatId(newSession.id);
  };

  // Handle delete chat
  const handleDeleteChat = (chatId) => {
    setSessions(prev => prev.filter(s => s.id !== chatId));
    // If the deleted chat was selected, select the next available chat
    if (selectedChatId === chatId) {
      const remaining = sessions.filter(s => s.id !== chatId);
      setSelectedChatId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  // Handle sending a message and/or image
  const handleSendMessage = async (text) => {
    if (!text.trim()) return;
    // Add user message
    setSessions(prev => prev.map(s =>
      s.id === selectedChatId
        ? { ...s, messages: [...s.messages, { isBot: false, text }] }
        : s
    ));
    // Add loading bot message
    setSessions(prev => prev.map(s =>
      s.id === selectedChatId
        ? { ...s, messages: [...s.messages, { isBot: true, text: 'Improving prompt...', loading: true }] }
        : s
    ));
    try {
      // Set chat title if empty
      setSessions(prev => prev.map(s =>
        s.id === selectedChatId && !s.title
          ? { ...s, title: text.slice(0, 40) }
          : s
      ));
      const res = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          model: currentModel
        })
      });
      const data = await res.json();
      setSessions(prev => prev.map(s =>
        s.id === selectedChatId
          ? { ...s, messages: [...s.messages.slice(0, -1), { isBot: true, text: data.response }] }
          : s
      ));
    } catch (err) {
      setSessions(prev => prev.map(s =>
        s.id === selectedChatId
          ? { ...s, messages: [...s.messages.slice(0, -1), { isBot: true, text: 'Sorry, there was an error processing your request.' }] }
          : s
      ));
    }
  };

  return (
    <div className="flex min-h-screen bg-cream">
      {/* Sidebar */}
      <Sidebar
        chatHistory={sessions}
        selectedChatId={selectedChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
      />
      {/* Main Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Model Switcher */}
        <div className="p-6">
          <ModelSwitcher
            models={MODELS}
            currentModel={currentModel}
            setCurrentModel={setCurrentModel}
          />
        </div>
        {/* Chat Thread */}
        <div className="flex-1 overflow-y-auto px-6">
          <ChatThread messages={filteredMessages} searchQuery={searchQuery} />
        </div>
        {/* Input Bar */}
        <div className="p-6">
          <InputBar
            onSend={handleSendMessage}
            onSearchOpen={() => setSearchOpen(true)}
            searchOpen={searchOpen}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearchClose={() => { setSearchOpen(false); setSearchQuery(''); }}
          />
        </div>
      </div>
      {/* Context Panel */}
      <ContextPanel />
    </div>
  );
} 