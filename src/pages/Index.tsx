
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import UserNameInput from '@/components/UserNameInput';
import BlurtComposer from '@/components/BlurtComposer';
import MessageList from '@/components/MessageList';
import ConnectionStatus from '@/components/ConnectionStatus';
import { peerService } from '@/services/mockPeerService';
import { BlurtMessage, PeerStatus } from '@/types';
import { toast } from "sonner";

const MAX_BLURT_LENGTH = 234;

const Index = () => {
  const [messages, setMessages] = useState<BlurtMessage[]>([]);
  const [username, setUsername] = useState<string>('');
  const [connectionStatus, setConnectionStatus] = useState<PeerStatus>('disconnected');
  const [peerCount, setPeerCount] = useState(0);

  useEffect(() => {
    // Initialize username if stored before
    const storedUsername = localStorage.getItem('blurt-username') || '';
    if (storedUsername) {
      setUsername(storedUsername);
      peerService.setUsername(storedUsername);
    }
    
    // Subscribe to messages
    const unsubscribeMessages = peerService.onMessages((updatedMessages) => {
      setMessages([...updatedMessages]);
    });
    
    // Subscribe to connection changes
    const unsubscribeConnection = peerService.onConnectionChange((status, count) => {
      setConnectionStatus(status);
      setPeerCount(count);
      
      // Notify user of connection changes
      if (status === 'connected') {
        toast.success('Connected to the network!');
      } else if (status === 'disconnected') {
        toast.error('Disconnected from the network');
      }
    });
    
    // Connect to the peer network
    peerService.connect();
    
    return () => {
      unsubscribeMessages();
      unsubscribeConnection();
      peerService.disconnect();
    };
  }, []);

  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
    peerService.setUsername(newUsername);
    localStorage.setItem('blurt-username', newUsername);
    toast.success(`Username updated to ${newUsername || 'Rando'}`);
  };

  const handleSendBlurt = (text: string) => {
    try {
      peerService.sendMessage(text);
      toast.success('Blurt sent!');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to send Blurt');
      }
    }
  };

  return (
    <div className="min-h-screen bg-blurt-base">
      <Header />
      
      <main className="blurt-container pb-20">
        <div className="mb-6 mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <UserNameInput onSave={handleUsernameChange} initialName={username} />
          <ConnectionStatus status={connectionStatus} peerCount={peerCount} />
        </div>
        
        <div className="mb-8">
          <BlurtComposer onSendBlurt={handleSendBlurt} maxLength={MAX_BLURT_LENGTH} />
        </div>
        
        <MessageList messages={messages} currentUsername={username || 'Rando'} />
      </main>
      
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-[#e2e2e7]/50 py-2 text-xs text-center text-blurt-secondary">
        Blurt! - Peer-to-peer microblogging. <span className="opacity-75">Messages are public & limited to 234 characters.</span>
      </footer>
    </div>
  );
};

export default Index;
