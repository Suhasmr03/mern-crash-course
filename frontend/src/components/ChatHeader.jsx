import React from 'react'
import { useChatStore } from '../store/useChatStore.js';
import { useAuthStore } from '../store/useAuthStore.js';
import {X} from 'lucide-react';

const ChatHeader = () => {
    const {selectedUser, setSelectedUser} = useChatStore();
    const {onlineUsers} = useAuthStore();

  return (
    <div className="flex items-center gap-3 px-3 py-3 border-b border-base-300 bg-base-100">
      {/* Profile Picture */}
      <img
        src={selectedUser.profilePicture || '/default-avatar.png'}
        alt={selectedUser.fullName}
        className="size-10 rounded-full object-cover"
        // // onError={(e) => {
        // //   e.target.src = '/default-avatar.png';
        // }}
      />

      {/* Full Name */}
      <h2 className="text-sm font-medium">{selectedUser.fullName}</h2>
      <div className="flex-1" />
      {/* Right: Close Button */}
      <button
        onClick={() => setSelectedUser(null)}
        className="p-2 rounded-full hover:bg-base-200 transition"
        aria-label="Close chat"
      >
        <X className="size-5 text-base-content justify-between" />
      </button>
    </div>
  )
}

export default ChatHeader