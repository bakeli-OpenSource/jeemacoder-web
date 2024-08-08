import React from 'react';
import ChatHeader from './ChatHeader/page';
import ChatMessage from './ChatMessage/page';
import MessageInput from './MessageInput/page';


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
