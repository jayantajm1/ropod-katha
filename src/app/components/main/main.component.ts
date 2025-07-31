import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { ChatComponent } from '../chat/chat.component';
import { StoryComponent } from '../story/story.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterModule, ContactListComponent, StoryComponent],
  template: `
    <div class="h-screen flex bg-gray-100">
      <!-- Sidebar with contacts -->
      <div class="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div class="p-4 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h1 class="text-xl font-semibold text-gray-800">RopodKatha</h1>
            <div class="flex items-center space-x-2">
              <button
                class="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                title="New Chat"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
              <button
                class="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                title="Settings"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Stories section -->
        <div class="p-4 border-b border-gray-200">
          <div class="flex space-x-3 overflow-x-auto pb-2">
            <div
              class="flex-shrink-0 text-center cursor-pointer"
              (click)="openStories()"
            >
              <div
                class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-1"
              >
                <svg
                  class="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <span class="text-xs text-gray-600">Add Story</span>
            </div>

            <!-- Sample story items -->
            <div
              class="flex-shrink-0 text-center cursor-pointer"
              *ngFor="let story of sampleStories"
              (click)="viewStory(story)"
            >
              <div
                class="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full p-0.5"
              >
                <div
                  class="w-full h-full bg-white rounded-full flex items-center justify-center"
                >
                  <span class="text-xs font-medium">{{ story.initials }}</span>
                </div>
              </div>
              <span class="text-xs text-gray-600">{{ story.name }}</span>
            </div>
          </div>
        </div>

        <!-- Contact list -->
        <div class="flex-1 overflow-hidden">
          <app-contact-list></app-contact-list>
        </div>
      </div>

      <!-- Main chat area -->
      <div class="flex-1 flex flex-col">
        <router-outlet></router-outlet>
      </div>

      <!-- Story overlay -->
      <app-story
        *ngIf="showingStories && selectedStory"
        [stories]="[selectedStory]"
        [contacts]="sampleStoryContacts"
        [currentStoryIndex]="0"
        (storyClosed)="closeStories()"
      ></app-story>
    </div>
  `,
  styles: [
    `
      ::-webkit-scrollbar {
        width: 6px;
      }

      ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px;
      }

      ::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 3px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
      }
    `,
  ],
})
export class MainComponent implements OnInit {
  showingStories = false;
  selectedStory: any = null;

  sampleStories = [
    { id: '1', name: 'John', initials: 'JD' },
    { id: '2', name: 'Sarah', initials: 'SM' },
    { id: '3', name: 'Mike', initials: 'MT' },
  ];

  sampleStoryContacts = [
    {
      id: '1',
      name: 'John Doe',
      avatar: 'https://via.placeholder.com/40x40/4F46E5/FFFFFF?text=JD',
      status: { emoji: '🟢', message: 'Available', online: true },
      lastMessage: '',
      lastMessageTime: new Date(),
      isTyping: false,
      stories: [],
      unreadCount: 0,
    },
  ];

  ngOnInit() {
    // Initialize main component
  }

  openStories() {
    // Open story creation
    console.log('Opening story creation...');
  }

  viewStory(story: any) {
    this.selectedStory = {
      id: story.id,
      userId: story.id,
      content: `Story from ${story.name}`,
      mediaUrl:
        'https://via.placeholder.com/400x700/4F46E5/FFFFFF?text=Sample+Story',
      mediaType: 'image',
      timestamp: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      viewCount: 0,
      viewers: [],
      isViewed: false,
    };
    this.showingStories = true;
  }

  closeStories() {
    this.showingStories = false;
    this.selectedStory = null;
  }
}
