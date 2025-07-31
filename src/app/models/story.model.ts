export interface Story {
  id: string;
  userId: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  timestamp: Date;
  expiresAt: Date;
  viewCount: number;
  viewers: string[];
  isViewed?: boolean;
}
