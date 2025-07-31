import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contactsSubject = new BehaviorSubject<Contact[]>([
    {
      id: '1',
      name: 'John Doe',
      avatar: 'https://via.placeholder.com/40x40/4F46E5/FFFFFF?text=JD',
      status: { emoji: '🟢', message: 'Available', online: true },
      lastMessage: 'Hey there! How are you doing?',
      lastMessageTime: new Date(Date.now() - 300000), // 5 minutes ago
      isTyping: false,
      stories: [],
      unreadCount: 2,
    },
    {
      id: '2',
      name: 'Sarah Miller',
      avatar: 'https://via.placeholder.com/40x40/10B981/FFFFFF?text=SM',
      status: {
        emoji: '🟡',
        message: 'Away',
        online: false,
        lastSeen: new Date(Date.now() - 300000),
      },
      lastMessage: 'See you tomorrow!',
      lastMessageTime: new Date(Date.now() - 1800000), // 30 minutes ago
      isTyping: false,
      stories: [],
      unreadCount: 0,
    },
    {
      id: '3',
      name: 'Mike Johnson',
      avatar: 'https://via.placeholder.com/40x40/F59E0B/FFFFFF?text=MJ',
      status: {
        emoji: '🔴',
        message: 'Busy',
        online: false,
        lastSeen: new Date(Date.now() - 3600000),
      },
      lastMessage: 'Thanks for the help!',
      lastMessageTime: new Date(Date.now() - 7200000), // 2 hours ago
      isTyping: false,
      stories: [],
      unreadCount: 1,
    },
  ]);

  constructor() {}

  getContacts(): Observable<Contact[]> {
    return this.contactsSubject.asObservable();
  }

  searchContacts(query: string): Observable<Contact[]> {
    return this.contactsSubject.pipe(
      map((contacts) =>
        contacts.filter((contact) =>
          contact.name.toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  }

  getContactById(id: string): Observable<Contact | undefined> {
    return this.contactsSubject.pipe(
      map((contacts) => contacts.find((contact) => contact.id === id))
    );
  }

  updateContact(updatedContact: Contact): void {
    const contacts = this.contactsSubject.value;
    const index = contacts.findIndex(
      (contact) => contact.id === updatedContact.id
    );
    if (index !== -1) {
      contacts[index] = updatedContact;
      this.contactsSubject.next([...contacts]);
    }
  }

  addContact(contact: Contact): void {
    const contacts = this.contactsSubject.value;
    this.contactsSubject.next([...contacts, contact]);
  }
}
