import { Injectable, OnDestroy } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { environment } from '../environments/environment';

export interface TypingData {
  userId: string;
  chatId: string;
  isTyping: boolean;
}

export interface UserStatusUpdate {
  userId: string;
  isOnline: boolean;
  lastSeen?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class SignalRService implements OnDestroy {
  private hubConnection!: signalR.HubConnection;
  private messageReceived = new Subject<Message>();
  private typingReceived = new Subject<TypingData>();
  private userStatusReceived = new Subject<UserStatusUpdate>();
  private connectionStatus = new BehaviorSubject<boolean>(false);

  public messageReceived$ = this.messageReceived.asObservable();
  public typingReceived$ = this.typingReceived.asObservable();
  public userStatusReceived$ = this.userStatusReceived.asObservable();
  public connectionStatus$ = this.connectionStatus.asObservable();

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  ngOnDestroy(): void {
    this.stopConnection();
    this.messageReceived.complete();
    this.typingReceived.complete();
    this.userStatusReceived.complete();
    this.connectionStatus.complete();
  }

  private createConnection(): void {
    const logLevel = this.getSignalRLogLevel(environment.signalR.logLevel);
    
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.signalR.hubUrl)
      .withAutomaticReconnect(environment.signalR.reconnectIntervals)
      .configureLogging(logLevel)
      .build();

    // Configure connection timeouts
    this.hubConnection.keepAliveIntervalInMilliseconds = environment.signalR.keepAliveInterval;
    this.hubConnection.serverTimeoutInMilliseconds = environment.signalR.connectionTimeout;
  }

  private getSignalRLogLevel(level: string): signalR.LogLevel {
    switch (level.toLowerCase()) {
      case 'none': return signalR.LogLevel.None;
      case 'critical': return signalR.LogLevel.Critical;
      case 'error': return signalR.LogLevel.Error;
      case 'warning': return signalR.LogLevel.Warning;
      case 'information': return signalR.LogLevel.Information;
      case 'debug': return signalR.LogLevel.Debug;
      case 'trace': return signalR.LogLevel.Trace;
      default: return signalR.LogLevel.Information;
    }
  }

  private async startConnection(): Promise<void> {
    try {
      await this.hubConnection.start();
      console.log('SignalR connection started successfully');
      this.connectionStatus.next(true);
    } catch (error) {
      console.error('Error while starting SignalR connection:', error);
      this.connectionStatus.next(false);
      // Retry connection after 5 seconds
      setTimeout(() => this.startConnection(), 5000);
    }
  }

  private registerOnServerEvents(): void {
    // Handle connection events
    this.hubConnection.onclose(() => {
      console.log('SignalR connection closed');
      this.connectionStatus.next(false);
    });

    this.hubConnection.onreconnecting(() => {
      console.log('SignalR reconnecting...');
      this.connectionStatus.next(false);
    });

    this.hubConnection.onreconnected(() => {
      console.log('SignalR reconnected');
      this.connectionStatus.next(true);
    });

    // Handle server events
    this.hubConnection.on('ReceiveMessage', (message: Message) => {
      this.messageReceived.next(message);
    });

    this.hubConnection.on('UserTyping', (data: TypingData) => {
      this.typingReceived.next(data);
    });

    this.hubConnection.on('UserStatusUpdate', (data: UserStatusUpdate) => {
      this.userStatusReceived.next(data);
    });
  }

  // Message operations
  async sendMessage(message: Message): Promise<void> {
    if (this.hubConnection.state !== signalR.HubConnectionState.Connected) {
      throw new Error('SignalR connection is not active');
    }

    try {
      await this.hubConnection.invoke('SendMessage', message);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async deleteMessage(messageId: string, chatId: string): Promise<void> {
    if (this.hubConnection.state !== signalR.HubConnectionState.Connected) {
      throw new Error('SignalR connection is not active');
    }

    try {
      await this.hubConnection.invoke('DeleteMessage', messageId, chatId);
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  }

  async editMessage(messageId: string, newContent: string, chatId: string): Promise<void> {
    if (this.hubConnection.state !== signalR.HubConnectionState.Connected) {
      throw new Error('SignalR connection is not active');
    }

    try {
      await this.hubConnection.invoke('EditMessage', messageId, newContent, chatId);
    } catch (error) {
      console.error('Error editing message:', error);
      throw error;
    }
  }

  // Typing indicators
  async sendTypingIndicator(chatId: string, isTyping: boolean): Promise<void> {
    if (this.hubConnection.state !== signalR.HubConnectionState.Connected) {
      return;
    }

    try {
      await this.hubConnection.invoke('SendTypingIndicator', chatId, isTyping);
    } catch (error) {
      console.error('Error sending typing indicator:', error);
    }
  }

  // Group operations
  async joinGroup(groupId: string): Promise<void> {
    if (this.hubConnection.state !== signalR.HubConnectionState.Connected) {
      throw new Error('SignalR connection is not active');
    }

    try {
      await this.hubConnection.invoke('JoinGroup', groupId);
    } catch (error) {
      console.error('Error joining group:', error);
      throw error;
    }
  }

  async leaveGroup(groupId: string): Promise<void> {
    if (this.hubConnection.state !== signalR.HubConnectionState.Connected) {
      throw new Error('SignalR connection is not active');
    }

    try {
      await this.hubConnection.invoke('LeaveGroup', groupId);
    } catch (error) {
      console.error('Error leaving group:', error);
      throw error;
    }
  }

  // User status operations
  async updateUserStatus(isOnline: boolean): Promise<void> {
    if (this.hubConnection.state !== signalR.HubConnectionState.Connected) {
      return;
    }

    try {
      await this.hubConnection.invoke('UpdateUserStatus', isOnline);
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  }

  // Connection management
  async stopConnection(): Promise<void> {
    if (this.hubConnection) {
      try {
        await this.hubConnection.stop();
        console.log('SignalR connection stopped');
        this.connectionStatus.next(false);
      } catch (error) {
        console.error('Error stopping SignalR connection:', error);
      }
    }
  }

  async restartConnection(): Promise<void> {
    await this.stopConnection();
    await this.startConnection();
  }

  // Utility methods
  isConnected(): boolean {
    return this.hubConnection?.state === signalR.HubConnectionState.Connected;
  }

  getConnectionState(): signalR.HubConnectionState {
    return this.hubConnection?.state || signalR.HubConnectionState.Disconnected;
  }
}
