import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore.js';
import ChatHeader from './ChatHeader.jsx';
import MessageInput from './MessageInput.jsx';

const ChatContainer = () => {
  const { selectedUser, messages, getMessages, isMessagesLoading } = useChatStore();

  // Fetch messages when a user is selected
  useEffect(() => {
    if (selectedUser?.id) {
      getMessages(selectedUser.id);
    }
  }, [selectedUser, getMessages]);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-base-content/60">
        Select a user to start chatting
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-base-100">
      {/* Header */}
      <ChatHeader />

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {isMessagesLoading ? (
          <div className="flex items-center justify-center h-full w-full">
            <span className="loading loading-spinner text-primary"></span>
            <p className="ml-2 text-sm text-base-content/60">Loading messages…</p>
          </div>
        ) : messages.length === 0 ? (
          <p className="text-sm text-base-content/60">No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isSent ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  msg.isSent
                    ? 'bg-primary text-primary-content'
                    : 'bg-base-300 text-base-content'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input at bottom */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
