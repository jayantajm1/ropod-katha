import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input()
  message!: Message;
  @Input() isFromCurrentUser: boolean = false;

  @Output() reactionAdded = new EventEmitter<any>();
  @Output() messageReplied = new EventEmitter<Message>();
  @Output() messageDeleted = new EventEmitter<string>();

  showReactionPopup(event: MouseEvent): void {
    event.preventDefault();
    // Show reaction popup logic
  }

  showContextMenu(event: MouseEvent): void {
    event.preventDefault();
    // Show context menu logic
  }

  addReaction(emoji: string): void {
    this.reactionAdded.emit({
      messageId: this.message.id,
      emoji: emoji,
    });
  }

  replyToMessage(): void {
    this.messageReplied.emit(this.message);
  }

  deleteMessage(): void {
    this.messageDeleted.emit(this.message.id);
  }

  getMessageStatusIcon(): string {
    switch (this.message.status) {
      case 'sent':
        return 'check';
      case 'delivered':
        return 'check-double';
      case 'read':
        return 'check-double-blue';
      default:
        return '';
    }
  }
}
