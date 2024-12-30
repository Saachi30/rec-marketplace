import React from 'react'
import { useState } from 'react';
const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
  
    return (
      <div className="fixed bottom-4 right-4 w-3/4 bg-white rounded-xl shadow-lg">
        <div className="p-4 border-b">
          <h3 className="font-bold">Energy Advisor</h3>
        </div>
        <div className="h-96 overflow-y-auto p-4">
          {messages.map((msg, i) => (
            <div key={i} className={`mb-4 ${msg.type === 'user' ? 'text-right' : ''}`}>
              <div className={`inline-block p-3 rounded-lg ${
                msg.type === 'user' ? 'bg-green-600 text-white' : 'bg-gray-100'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Ask about renewable energy..."
          />
        </div>
      </div>
    );
  };

export default ChatBot;
