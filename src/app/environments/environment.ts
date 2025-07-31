// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
  // SignalR Configuration
  signalR: {
    hubUrl: 'https://localhost:5001/chathub',
    reconnectIntervals: [0, 2000, 10000, 30000], // milliseconds
    logLevel: 'Information', // 'None', 'Critical', 'Error', 'Warning', 'Information', 'Debug', 'Trace'
    automaticReconnect: true,
    connectionTimeout: 30000, // 30 seconds
    keepAliveInterval: 15000, // 15 seconds
  },

  // API Configuration
  api: {
    baseUrl: 'https://localhost:5001/api',
    timeout: 30000,
    retryAttempts: 3,
  },

  // Chat Configuration
  chat: {
    maxMessageLength: 4000,
    maxFileSize: 50 * 1024 * 1024, // 50MB
    allowedFileTypes: [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'video/mp4', 'video/webm', 'video/ogg',
      'audio/mp3', 'audio/wav', 'audio/ogg',
      'application/pdf', 'text/plain',
      'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],
    typingIndicatorTimeout: 3000, // 3 seconds
    messageHistoryLimit: 100,
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
    level: 'debug', // 'error', 'warn', 'info', 'debug'
    enableConsoleLogging: true,
    enableRemoteLogging: false,
  }
};