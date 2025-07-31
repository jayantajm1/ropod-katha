import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-gray-100 p-6">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
          <p class="text-gray-600">
            Manage your RopodKatha preferences and account settings
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <!-- Profile Settings -->
          <a
            routerLink="profile"
            class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div class="flex items-center mb-4">
              <div
                class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3"
              >
                <svg
                  class="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Profile</h3>
            </div>
            <p class="text-gray-600">
              Update your profile information, avatar, and status
            </p>
          </a>

          <!-- Privacy Settings -->
          <a
            routerLink="privacy"
            class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div class="flex items-center mb-4">
              <div
                class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3"
              >
                <svg
                  class="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Privacy</h3>
            </div>
            <p class="text-gray-600">
              Control who can see your information and stories
            </p>
          </a>

          <!-- Notification Settings -->
          <a
            routerLink="notifications"
            class="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div class="flex items-center mb-4">
              <div
                class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3"
              >
                <svg
                  class="w-5 h-5 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-5 5-5-5h5z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 7h6m0 0v10M9 7V6a2 2 0 012-2h0a2 2 0 012 2v1"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Notifications</h3>
            </div>
            <p class="text-gray-600">Customize your notification preferences</p>
          </a>

          <!-- Account Settings -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center mb-4">
              <div
                class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3"
              >
                <svg
                  class="w-5 h-5 text-purple-600"
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
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Account</h3>
            </div>
            <p class="text-gray-600 mb-4">
              Manage your account and security settings
            </p>
            <button class="text-red-600 hover:text-red-700 font-medium">
              Sign Out
            </button>
          </div>

          <!-- Support -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center mb-4">
              <div
                class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3"
              >
                <svg
                  class="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">
                Help & Support
              </h3>
            </div>
            <p class="text-gray-600">Get help and contact support</p>
          </div>

          <!-- About -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center mb-4">
              <div
                class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3"
              >
                <svg
                  class="w-5 h-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">About</h3>
            </div>
            <p class="text-gray-600">App version and information</p>
          </div>
        </div>

        <div class="mt-8 text-center">
          <a
            routerLink="/"
            class="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <svg
              class="w-4 h-4 mr-2"
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
            Back to Chat
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class SettingsComponent {}
