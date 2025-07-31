import {
  Component,
  EventEmitter,
  Output,
  Input,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
})
export class MessageInputComponent implements OnDestroy {
  @ViewChild('messageInput') messageInput!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  @Output() messageSent = new EventEmitter<string>();
  @Output() typingStarted = new EventEmitter<void>();
  @Output() typingStopped = new EventEmitter<void>();
  @Output() fileSelected = new EventEmitter<File>();

  @Input() disabled = false;
  @Input() placeholder = 'Type a message...';
  @Input() maxLength = 4000;
  @Input() allowFileUpload = true;
  @Input() allowEmoji = true;

  messageText = '';
  isTyping = false;
  showEmojiPicker = false;
  selectedFiles: File[] = [];

  private destroy$ = new Subject<void>();
  private typingSubject = new Subject<string>();

  // Common emojis for quick access
  commonEmojis = [
    '😀',
    '😃',
    '😄',
    '😁',
    '😆',
    '😅',
    '😂',
    '🤣',
    '😊',
    '😇',
    '🙂',
    '🙃',
    '😉',
    '😌',
    '😍',
    '🥰',
    '😘',
    '😗',
    '😙',
    '😚',
    '😋',
    '😛',
    '😝',
    '😜',
    '🤪',
    '🤨',
    '🧐',
    '🤓',
    '😎',
    '🤩',
    '🥳',
    '😏',
    '😒',
    '😞',
    '😔',
    '😟',
    '😕',
    '🙁',
    '☹️',
    '😣',
    '😖',
    '😫',
    '😩',
    '🥺',
    '😢',
    '😭',
    '😤',
    '😠',
    '😡',
    '🤬',
    '👍',
    '👎',
    '👌',
    '✌️',
    '🤞',
    '🤟',
    '🤘',
    '🤙',
    '👈',
    '👉',
    '👆',
    '🖕',
    '👇',
    '☝️',
    '👋',
    '🤚',
    '🖐️',
    '✋',
    '🖖',
    '👏',
    '🙌',
    '🤲',
    '🤝',
    '🙏',
    '✍️',
    '💪',
    '🦾',
    '🦿',
    '🦵',
    '🦶',
    '❤️',
    '🧡',
    '💛',
    '💚',
    '💙',
    '💜',
    '🖤',
    '🤍',
    '🤎',
    '💔',
    '❣️',
    '💕',
    '💞',
    '💓',
    '💗',
    '💖',
    '💘',
    '💝',
    '💟',
    '☮️',
  ];

  constructor() {
    // Setup typing indicator with debounce
    this.typingSubject
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.isTyping) {
          this.stopTyping();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onInputChange(): void {
    if (!this.isTyping && this.messageText.trim()) {
      this.startTyping();
    }

    this.typingSubject.next(this.messageText);
    this.adjustTextareaHeight();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  sendMessage(): void {
    const message = this.messageText.trim();
    if (message && !this.disabled) {
      this.messageSent.emit(message);
      this.messageText = '';
      this.stopTyping();
      this.adjustTextareaHeight();

      // Focus back to input
      setTimeout(() => {
        this.messageInput?.nativeElement?.focus();
      }, 100);
    }
  }

  private startTyping(): void {
    if (!this.isTyping) {
      this.isTyping = true;
      this.typingStarted.emit();
    }
  }

  private stopTyping(): void {
    if (this.isTyping) {
      this.isTyping = false;
      this.typingStopped.emit();
    }
  }

  private adjustTextareaHeight(): void {
    const textarea = this.messageInput?.nativeElement;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(textarea.scrollHeight, 120); // Max 120px height
      textarea.style.height = newHeight + 'px';
    }
  }

  // File handling
  onFileButtonClick(): void {
    this.fileInput?.nativeElement?.click();
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let file of files) {
        if (this.isValidFile(file)) {
          this.selectedFiles.push(file);
          this.fileSelected.emit(file);
        }
      }
    }
    // Reset input
    event.target.value = '';
  }

  private isValidFile(file: File): boolean {
    const maxSize = 50 * 1024 * 1024; // 50MB
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'video/mp4',
      'video/webm',
      'audio/mp3',
      'audio/wav',
      'application/pdf',
      'text/plain',
    ];

    if (file.size > maxSize) {
      alert('File size must be less than 50MB');
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      alert('File type not supported');
      return false;
    }

    return true;
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  // Emoji handling
  toggleEmojiPicker(): void {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  insertEmoji(emoji: string): void {
    const textarea = this.messageInput?.nativeElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = this.messageText;

      this.messageText = text.slice(0, start) + emoji + text.slice(end);

      // Set cursor position after emoji
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + emoji.length, start + emoji.length);
      }, 0);
    }

    this.showEmojiPicker = false;
  }

  // Voice message (placeholder for future implementation)
  startVoiceRecording(): void {
    console.log('Voice recording feature - to be implemented');
  }

  // Utility methods
  get characterCount(): number {
    return this.messageText.length;
  }

  get isNearLimit(): boolean {
    return this.characterCount > this.maxLength * 0.8;
  }

  get isOverLimit(): boolean {
    return this.characterCount > this.maxLength;
  }

  get canSend(): boolean {
    return (
      this.messageText.trim().length > 0 && !this.isOverLimit && !this.disabled
    );
  }
}
