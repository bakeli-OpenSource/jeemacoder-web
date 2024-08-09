import React from 'react';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatMessage from './ChatMessage/ChatMessage';
import MessageInput from './MessageInput/MessageInput';


const ChatPage: React.FC = () => {
  return (
    <div className="max-w-full overflow-hidden mx-auto p-6">
      <ChatHeader />
      <div className="mt-60">
        <ChatMessage username="Drissa Coulibaly" message="a rejoint le chat du projet." time="10 h 09" />
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatPage;
