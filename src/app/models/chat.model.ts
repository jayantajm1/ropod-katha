import { Message } from './message.model';
import { Contact } from './contact.model';

export interface Chat {
  id: string;
  participants: string[];
  messages: Message[];
  lastMessage?: Message;
  lastActivity: Date;
  isGroup: boolean;
  groupName?: string;
  groupAvatar?: string;
  groupDescription?: string;
  groupAdmins?: string[];
  createdAt: Date;
  createdBy: string;
  unreadCount: number;
  isArchived: boolean;
  isPinned: boolean;
  mutedUntil?: Date;
}

export interface ChatPreview {
  id: string;
  contact: Contact;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isTyping: boolean;
  isPinned: boolean;
  isArchived: boolean;
  mutedUntil?: Date;
}
