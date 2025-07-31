import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ContactService } from '../../services/contact.service';
import { ChatService } from '../../services/chat.service';
import { Contact } from '../../models/contact.model';
import { AvatarComponent } from '../shared/avatar/avatar.component';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ContactListComponent implements OnInit {
  contacts$: Observable<Contact[]> | undefined;
  searchQuery = '';
  selectedContactId: string | null = null;

  constructor(
    private contactService: ContactService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.contacts$ = this.contactService.getContacts();
  }

  selectContact(contact: Contact): void {
    this.selectedContactId = contact.id;
    this.chatService.selectContact(contact);
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.contacts$ = this.contactService.searchContacts(query);
  }

  trackByContactId(index: number, contact: Contact): string {
    return contact.id;
  }
}
