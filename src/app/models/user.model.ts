export interface User {
  id: string;
  name: string;
  email?: string;
  avatar: string;
  status: UserStatus;
  isOnline: boolean;
  lastSeen?: Date;
  phoneNumber?: string;
  bio?: string;
}

export interface UserStatus {
  emoji: string;
  message: string;
  online: boolean;
  lastSeen?: Date;
}
