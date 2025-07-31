import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private currentContactSubject = new BehaviorSubject<Contact | null>(null);

  private messagesSubject = new BehaviorSubject<Message[]>([]);

  currentContact$: Observable<Contact | null> =
    this.currentContactSubject.asObservable();

  messages$: Observable<Message[]> = this.messagesSubject.asObservable();

  selectContact(contact: Contact): void {
    this.currentContactSubject.next(contact);
    this.loadMessages(contact.id);
  }

  sendMessage(content: string): void {
    // Implementation for sending messages
  }

  private loadMessages(contactId: string): void {
    // Load messages for contact
  }
}
