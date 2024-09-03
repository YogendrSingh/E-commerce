import React, { useState } from 'react';
import './index.css';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, id: Date.now() }]);
      setInput('');
    }
  };

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div className="chatbox-container">
          <div className="chatbox-header">
            <h3>Chat</h3>
            <button className="close-btn" onClick={toggleChatbox}>
              ×
            </button>
          </div>
          <div className="chatbox-messages">
            {messages.map(message => (
              <div key={message.id} className="chatbox-message">
                {message.text}
              </div>
            ))}
          </div>
          <div className="chatbox-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
      {!isOpen && (
        <button className="open-chatbox-btn" onClick={toggleChatbox}>
          Open Chatbox
        </button>
      )}
    </>
  );
};

export default ChatBox;
