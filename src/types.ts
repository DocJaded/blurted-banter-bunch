
export interface BlurtMessage {
  id: string;
  text: string;
  username: string;
  timestamp: number;
}

export type PeerStatus = 'disconnected' | 'connecting' | 'connected';
