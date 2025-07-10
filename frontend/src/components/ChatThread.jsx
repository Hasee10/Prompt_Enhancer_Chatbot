import React from 'react';
import MessageCard from './MessageCard';

export default function ChatThread({ messages }) {
  return (
    <div className="flex flex-col space-y-6 py-8">
      {messages.map((msg, idx) => (
        <MessageCard
          key={idx}
          isBot={msg.isBot}
          text={msg.text}
          image={msg.image}
          actions={msg.actions}
        />
      ))}
    </div>
  );
} 