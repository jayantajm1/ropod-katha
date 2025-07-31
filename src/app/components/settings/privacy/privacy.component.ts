import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100 p-6">
      <div class="max-w-2xl mx-auto">
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center mb-6">
            <a
              routerLink="/settings"
              class="mr-4 p-2 hover:bg-gray-100 rounded-lg"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </a>
            <h1 class="text-2xl font-bold text-gray-900">Privacy Settings</h1>
          </div>

          <div class="space-y-6">
            <div class="border-b border-gray-200 pb-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                Who can see my information
              </h3>

              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium text-gray-900">Last Seen</p>
                    <p class="text-sm text-gray-600">
                      When you were last online
                    </p>
                  </div>
                  <select class="border border-gray-300 rounded-md px-3 py-2">
                    <option>Everyone</option>
                    <option>Contacts only</option>
                    <option>Nobody</option>
                  </select>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium text-gray-900">Profile Photo</p>
                    <p class="text-sm text-gray-600">Your profile picture</p>
                  </div>
                  <select class="border border-gray-300 rounded-md px-3 py-2">
                    <option>Everyone</option>
                    <option>Contacts only</option>
                    <option>Nobody</option>
                  </select>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium text-gray-900">Stories</p>
                    <p class="text-sm text-gray-600">
                      Who can view your stories
                    </p>
                  </div>
                  <select class="border border-gray-300 rounded-md px-3 py-2">
                    <option>Everyone</option>
                    <option>Contacts only</option>
                    <option>Selected contacts</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                Messaging
              </h3>

              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium text-gray-900">Read Receipts</p>
                    <p class="text-sm text-gray-600">
                      Show when you read messages
                    </p>
                  </div>
                  <label
                    class="relative inline-flex items-center cursor-pointer"
                  >
                    <input type="checkbox" checked class="sr-only peer" />
                    <div
                      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                    ></div>
                  </label>
                </div>

                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium text-gray-900">Typing Indicators</p>
                    <p class="text-sm text-gray-600">Show when you're typing</p>
                  </div>
                  <label
                    class="relative inline-flex items-center cursor-pointer"
                  >
                    <input type="checkbox" checked class="sr-only peer" />
                    <div
                      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                    ></div>
                  </label>
                </div>
              </div>
            </div>

            <div class="flex space-x-4">
              <button
                class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save Changes
              </button>
              <button
                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class PrivacyComponent {}
