export const environment = {
  production: true,
  
  // SignalR Configuration
  signalR: {
    hubUrl: 'https://your-production-api.com/chathub', // Replace with your production SignalR hub URL
    reconnectIntervals: [0, 2000, 10000, 30000, 60000], // More aggressive reconnection for production
    logLevel: 'Warning', // Less verbose logging in production
    automaticReconnect: true,
    connectionTimeout: 45000, // 45 seconds - longer timeout for production
    keepAliveInterval: 30000, // 30 seconds
  },

  // API Configuration
  api: {
    baseUrl: 'https://your-production-api.com/api', // Replace with your production API URL
    timeout: 45000, // Longer timeout for production
    retryAttempts: 5, // More retry attempts in production
  },

  // Chat Configuration
  chat: {
    maxMessageLength: 4000,
    maxFileSize: 100 * 1024 * 1024, // 100MB for production
    allowedFileTypes: [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'video/mp4', 'video/webm', 'video/ogg',
      'audio/mp3', 'audio/wav', 'audio/ogg',
      'application/pdf', 'text/plain',
      'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],
    typingIndicatorTimeout: 3000,
    messageHistoryLimit: 200, // More messages in production
  },

  // Feature Flags
  features: {
    enableVoiceMessages: true,
    enableFileSharing: true,
    enableStories: true,
    enableGroupChats: true,
    enableMessageReactions: true,
    enableMessageEditing: true,
    enableMessageDeletion: true,
    enableReadReceipts: true,
    enableTypingIndicators: true,
    enableOnlineStatus: true,
  },

  // Logging
  logging: {
    level: 'warn', // Less verbose logging in production
    enableConsoleLogging: false, // Disable console logging in production
    enableRemoteLogging: true, // Enable remote logging for production monitoring
  }
};