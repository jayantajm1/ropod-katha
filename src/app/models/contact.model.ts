import { UserStatus } from './user.model';
import { Story } from './story.model';

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: UserStatus;
  lastMessage: string;
  lastMessageTime: Date;
  isTyping: boolean;
  isGroup?: boolean;
  members?: string[];
  stories: Story[];
  unreadCount: number;
}
