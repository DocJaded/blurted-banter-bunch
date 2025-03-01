
import { BlurtMessage } from '@/types';

// This is a mock implementation for demo purposes only
// In a real app, this would use WebRTC or a similar P2P technology
export class MockPeerService {
  private listeners: Array<(messages: BlurtMessage[]) => void> = [];
  private connectionListeners: Array<(status: 'disconnected' | 'connecting' | 'connected', peerCount: number) => void> = [];
  private messages: BlurtMessage[] = [];
  private connectionStatus: 'disconnected' | 'connecting' | 'connected' = 'disconnected';
  private peerCount = 0;
  private connectTimeout: ReturnType<typeof setTimeout> | null = null;
  private username = '';

  constructor() {
    // Load sample messages for demo
    this.messages = [
      {
        id: '1',
        text: "Hello world! This is the first Blurt on the network.",
        username: "Alice",
        timestamp: Date.now() - 3600000 * 2
      },
      {
        id: '2',
        text: "Excited to try this out! The 234 character limit is interesting - makes you really think about what you want to say.",
        username: "Bob",
        timestamp: Date.now() - 1800000
      },
      {
        id: '3',
        text: "I love how minimalist this is. Just pure text communication without all the noise.",
        username: "Carol",
        timestamp: Date.now() - 900000
      }
    ];
  }

  public connect(): void {
    this.setConnectionStatus('connecting');
    
    // Simulate connection delay
    this.connectTimeout = setTimeout(() => {
      this.setConnectionStatus('connected');
      this.setPeerCount(Math.floor(Math.random() * 5) + 1);
      this.notifyListeners();
    }, 1500);
  }

  public disconnect(): void {
    if (this.connectTimeout) {
      clearTimeout(this.connectTimeout);
    }
    
    this.setConnectionStatus('disconnected');
    this.setPeerCount(0);
  }

  public sendMessage(text: string): void {
    if (this.connectionStatus !== 'connected') {
      throw new Error('Cannot send message while disconnected');
    }
    
    const newMessage: BlurtMessage = {
      id: Date.now().toString(),
      text,
      username: this.username || 'Rando',
      timestamp: Date.now()
    };
    
    this.messages.push(newMessage);
    
    // Simulate network delay before broadcasting
    setTimeout(() => {
      this.notifyListeners();
    }, 300);
  }

  public setUsername(username: string): void {
    this.username = username;
  }

  public getUsername(): string {
    return this.username || 'Rando';
  }

  public getConnectionStatus(): 'disconnected' | 'connecting' | 'connected' {
    return this.connectionStatus;
  }

  public getPeerCount(): number {
    return this.peerCount;
  }

  public onMessages(callback: (messages: BlurtMessage[]) => void): () => void {
    this.listeners.push(callback);
    
    // Immediately notify with current messages
    setTimeout(() => {
      callback([...this.messages]);
    }, 0);
    
    return () => {
      this.listeners = this.listeners.filter((listener) => listener !== callback);
    };
  }

  public onConnectionChange(
    callback: (status: 'disconnected' | 'connecting' | 'connected', peerCount: number) => void
  ): () => void {
    this.connectionListeners.push(callback);
    
    // Immediately notify with current status
    setTimeout(() => {
      callback(this.connectionStatus, this.peerCount);
    }, 0);
    
    return () => {
      this.connectionListeners = this.connectionListeners.filter(
        (listener) => listener !== callback
      );
    };
  }

  private setConnectionStatus(status: 'disconnected' | 'connecting' | 'connected'): void {
    this.connectionStatus = status;
    this.notifyConnectionListeners();
  }

  private setPeerCount(count: number): void {
    this.peerCount = count;
    this.notifyConnectionListeners();
  }

  private notifyListeners(): void {
    this.listeners.forEach((listener) => {
      listener([...this.messages]);
    });
  }

  private notifyConnectionListeners(): void {
    this.connectionListeners.forEach((listener) => {
      listener(this.connectionStatus, this.peerCount);
    });
  }
}

// Export a singleton instance
export const peerService = new MockPeerService();
