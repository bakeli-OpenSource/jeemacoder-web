import React from 'react';

interface ChatMessageProps {
  username: string;
  message: string;
  time: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ username, message, time }) => {
  return (
    <div className="p-4 flex w-full items-start space-x-4">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
          {username.charAt(0)}
        </div>
      </div>
      <div>
        <div className="text-sm font-semibold">{username}</div>
        <div className="text-sm text-gray-500">{time}</div>
        <div className="text-gray-800 mt-1">{message}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
