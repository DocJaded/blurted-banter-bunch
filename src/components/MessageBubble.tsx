
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { BlurtMessage } from '@/types';

interface MessageBubbleProps {
  message: BlurtMessage;
  isCurrentUser: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  isCurrentUser 
}) => {
  const timeAgo = formatDistanceToNow(new Date(message.timestamp), { 
    addSuffix: true,
    includeSeconds: true
  });

  return (
    <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'} mb-4`}>
      <div className={`message-bubble
        ${isCurrentUser 
          ? 'bg-blurt-primary text-white ml-auto' 
          : 'bg-white border border-[#e2e2e7] mr-auto'}`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
      </div>
      
      <div className="mt-1 flex items-center text-xs text-blurt-secondary">
        <span className="font-medium mr-1">
          {isCurrentUser ? 'You' : message.username}
        </span>
        <span>·</span>
        <time className="ml-1">{timeAgo}</time>
      </div>
    </div>
  );
};

export default MessageBubble;
