export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  status: MessageStatus;
  type: MessageType;
  reactions: Reaction[];
  replyTo?: string;
  fileName?: string;
  fileSize?: string;
  duration?: number;
}

export type MessageStatus = 'sent' | 'delivered' | 'read';

export type MessageType = 'text' | 'voice' | 'file' | 'image';

export interface Reaction {
  emoji: string;
  userId: string;
}
