// components/Layout.tsx
import React from 'react';
import Chatbot from './chatbot';

const ChatbotLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="app-layout">
            <Chatbot />
            {children}
        </div>
    );
};

export default ChatbotLayout;