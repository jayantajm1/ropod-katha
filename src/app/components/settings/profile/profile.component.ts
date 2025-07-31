import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
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
            <h1 class="text-2xl font-bold text-gray-900">Profile Settings</h1>
          </div>

          <div class="space-y-6">
            <div class="text-center">
              <div
                class="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold"
              >
                JD
              </div>
              <button class="text-blue-600 hover:text-blue-700 font-medium">
                Change Avatar
              </button>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Display Name</label
              >
              <input
                type="text"
                value="John Doe"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Status Message</label
              >
              <input
                type="text"
                value="Available"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Bio</label
              >
              <textarea
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell others about yourself..."
              ></textarea>
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
export class ProfileComponent {}
