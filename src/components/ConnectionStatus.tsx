
import React from 'react';
import { PeerStatus } from '@/types';

interface ConnectionStatusProps {
  status: PeerStatus;
  peerCount: number;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ status, peerCount }) => {
  let statusColor = 'bg-blurt-secondary';
  let statusText = 'Disconnected';
  
  if (status === 'connecting') {
    statusColor = 'bg-amber-400';
    statusText = 'Connecting...';
  } else if (status === 'connected') {
    statusColor = 'bg-green-500';
    statusText = 'Connected';
  }
  
  return (
    <div className="flex items-center text-xs text-blurt-secondary">
      <div className={`h-2 w-2 rounded-full ${statusColor} mr-2 animate-pulse-subtle`} />
      <span>{statusText}</span>
      {status === 'connected' && peerCount > 0 && (
        <span className="ml-1">
          ({peerCount} peer{peerCount !== 1 ? 's' : ''})
        </span>
      )}
    </div>
  );
};

export default ConnectionStatus;
