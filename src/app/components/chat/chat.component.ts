import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ChatService } from '../../services/chat.service';
import { SignalRService } from '../../services/signalr.service';
import { Message } from '../../models/message.model';
import { Contact } from '../../models/contact.model';
import { AvatarComponent } from '../shared/avatar/avatar.component';
import { MessageInputComponent } from '../message-input/message-input.component';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AvatarComponent,
    MessageInputComponent,
    TimeAgoPipe,
  ],
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChild('searchInput') searchInput!: ElementRef;

  currentContact: Contact | null = null;
  messages: Message[] = [];
  filteredMessages: Message[] = [];
  isTyping = false;
  isConnected = true;
  showSearch = false;
  searchQuery = '';
  hasMoreMessages = true;
  isLoadingMessages = false;
  showScrollToBottom = false;

  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();
  private highlightedMessageId: string | null = null;

  constructor(
    private chatService: ChatService,
    private signalRService: SignalRService
  ) {
    // Setup search with debounce
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((query) => {
        this.performSearch(query);
      });
  }

  ngOnInit(): void {
    this.setupSubscriptions();
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSubscriptions(): void {
    // Current contact subscription
    this.chatService.currentContact$
      .pipe(takeUntil(this.destroy$))
      .subscribe((contact) => {
        this.currentContact = contact;
      });

    // Messages subscription
    this.chatService.messages$
      .pipe(takeUntil(this.destroy$))
      .subscribe((messages) => {
        this.messages = messages;
        this.filteredMessages = messages;
        setTimeout(() => this.scrollToBottom(), 100);
      });

    // Typing indicator subscription
    this.signalRService.typingReceived$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data.chatId === this.currentContact?.id) {
          this.isTyping = data.isTyping;
        }
      });

    // Connection status subscription
    this.signalRService.connectionStatus$
      .pipe(takeUntil(this.destroy$))
      .subscribe((connected) => {
        this.isConnected = connected;
      });
  }

  // Navigation methods
  goBack(): void {
    // Navigate back or close chat
    window.history.back();
  }

  // Status methods
  getStatusText(): string {
    if (!this.currentContact) return '';

    if (this.currentContact.status.online) {
      return 'Online';
    } else if (this.currentContact.status.lastSeen) {
      const lastSeen = new Date(this.currentContact.status.lastSeen);
      const now = new Date();
      const diffInMinutes = Math.floor(
        (now.getTime() - lastSeen.getTime()) / (1000 * 60)
      );

      if (diffInMinutes < 60) {
        return `Last seen ${diffInMinutes}m ago`;
      } else if (diffInMinutes < 1440) {
        const hours = Math.floor(diffInMinutes / 60);
        return `Last seen ${hours}h ago`;
      } else {
        return 'Last seen recently';
      }
    }

    return 'Offline';
  }

  // Search methods
  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (this.showSearch) {
      setTimeout(() => {
        this.searchInput?.nativeElement?.focus();
      }, 100);
    } else {
      this.clearSearch();
    }
  }

  onSearchMessages(event: any): void {
    const query = event.target.value;
    this.searchSubject.next(query);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filteredMessages = this.messages;
    this.highlightedMessageId = null;
  }

  private performSearch(query: string): void {
    if (!query.trim()) {
      this.filteredMessages = this.messages;
      return;
    }

    this.filteredMessages = this.messages.filter((message) =>
      message.content.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Options methods
  toggleOptions(): void {
    console.log('Toggle options menu');
  }

  // Message methods
  onMessageSent(message: string): void {
    this.chatService.sendMessage(message);
    setTimeout(() => this.scrollToBottom(), 100);
  }

  onMessageDeleted(messageId: string): void {
    // TODO: Implement message deletion via SignalR
    this.signalRService.deleteMessage(messageId, this.currentContact?.id || '');
  }

  onMessageEdited(data: { messageId: string; newContent: string }): void {
    // TODO: Implement message editing via SignalR
    this.signalRService.editMessage(
      data.messageId,
      data.newContent,
      this.currentContact?.id || ''
    );
  }

  onReactionAdded(data: { messageId: string; emoji: string }): void {
    // TODO: Implement reaction via SignalR
    console.log('Add reaction:', data);
  }

  isFromCurrentUser(message: Message): boolean {
    // Replace with actual current user ID logic
    return message.senderId === 'current-user-id';
  }

  isMessageHighlighted(messageId: string): boolean {
    return this.highlightedMessageId === messageId;
  }

  trackByMessageId(index: number, message: Message): string {
    return message.id;
  }

  // Typing methods
  onTypingStarted(): void {
    if (this.currentContact) {
      this.signalRService.sendTypingIndicator(this.currentContact.id, true);
    }
  }

  onTypingStopped(): void {
    if (this.currentContact) {
      this.signalRService.sendTypingIndicator(this.currentContact.id, false);
    }
  }

  // Call methods
  startVideoCall(): void {
    if (this.currentContact) {
      console.log('Starting video call with:', this.currentContact.name);
      // TODO: Implement video call logic
    }
  }

  startVoiceCall(): void {
    if (this.currentContact) {
      console.log('Starting voice call with:', this.currentContact.name);
      // TODO: Implement voice call logic
    }
  }

  // Scroll methods
  onScroll(event: any): void {
    const element = event.target;
    const atBottom =
      element.scrollHeight - element.scrollTop === element.clientHeight;
    const atTop = element.scrollTop === 0;

    this.showScrollToBottom = !atBottom && element.scrollTop > 300;

    // Load more messages when scrolled to top
    if (atTop && this.hasMoreMessages && !this.isLoadingMessages) {
      this.loadMoreMessages();
    }
  }

  scrollToBottom(): void {
    if (this.messagesContainer) {
      const element = this.messagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
      this.showScrollToBottom = false;
    }
  }

  // Message loading methods
  loadMoreMessages(): void {
    if (!this.currentContact || this.isLoadingMessages) return;

    this.isLoadingMessages = true;

    // TODO: Implement load more messages
    setTimeout(() => {
      this.hasMoreMessages = false; // Set to false for now
      this.isLoadingMessages = false;
    }, 1000);
  }
}
