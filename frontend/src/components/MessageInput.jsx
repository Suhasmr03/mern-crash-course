import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useChatStore } from '../store/useChatStore.js';

const MessageInput = React.memo(() => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useChatStore();

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage(message);
    setMessage('');
  };

  return (
    <div className="border-t border-base-300 px-4 py-3 bg-base-100">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="input input-bordered w-full"
        />
        <button
          onClick={handleSend}
          className="btn btn-primary px-3"
          aria-label="Send message"
        >
          <Send className="size-4" />
        </button>
      </div>
    </div>
  );
});

export default MessageInput;
