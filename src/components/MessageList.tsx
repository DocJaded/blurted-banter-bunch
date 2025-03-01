
import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import { BlurtMessage } from '@/types';

interface MessageListProps {
  messages: BlurtMessage[];
  currentUsername: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUsername }) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when new messages come in
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-blurt-secondary mb-2 text-lg">No Blurts yet</div>
        <p className="text-blurt-secondary/70 text-sm max-w-md">
          Be the first to share something with the network! All messages are public and limited to 234 characters.
        </p>
      </div>
    );
  }

  return (
    <div className="py-4 space-y-4">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          isCurrentUser={message.username === currentUsername}
        />
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default MessageList;
