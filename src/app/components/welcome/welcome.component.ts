import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  template: `
    <div
      class="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8"
    >
      <div class="max-w-2xl mx-auto text-center">
        <!-- Main Welcome Section -->
        <div class="mb-12">
          <div class="relative mb-8">
            <!-- Animated background elements -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div
                class="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"
              ></div>
            </div>
            <div class="relative">
              <div
                class="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-6"
              >
                <svg
                  class="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <h1
            class="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4"
          >
            Welcome to RopodKatha
          </h1>
          <p class="text-xl text-gray-600 mb-8 leading-relaxed">
            Your conversations are waiting. Connect with friends, share moments,
            and stay in touch with the people who matter most.
          </p>
        </div>

        <!-- Feature Cards -->
        <div class="grid md:grid-cols-3 gap-6 mb-12">
          <div
            class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div
              class="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mb-4 mx-auto"
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
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              Real-time Chat
            </h3>
            <p class="text-gray-600 text-sm">
              Instant messaging with typing indicators and read receipts
            </p>
          </div>

          <div
            class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div
              class="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-4 mx-auto"
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
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Stories</h3>
            <p class="text-gray-600 text-sm">
              Share moments that disappear after 24 hours
            </p>
          </div>

          <div
            class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div
              class="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mb-4 mx-auto"
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Secure</h3>
            <p class="text-gray-600 text-sm">
              End-to-end encryption keeps your messages private
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            class="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center"
          >
            <svg
              class="w-5 h-5 mr-2 group-hover:animate-bounce"
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
            Start New Chat
          </button>

          <button
            class="group bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-gray-200 hover:border-gray-300 flex items-center"
          >
            <svg
              class="w-5 h-5 mr-2 group-hover:animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Create Story
          </button>
        </div>

        <!-- Quick Start Tips -->
        <div
          class="mt-16 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50"
        >
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Quick Start</h3>
          <div class="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div class="flex items-center">
              <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span>Select a contact from the sidebar to start chatting</span>
            </div>
            <div class="flex items-center">
              <div class="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              <span>Click on a story to view and react to it</span>
            </div>
            <div class="flex items-center">
              <div class="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span>Use the + button to add new contacts</span>
            </div>
            <div class="flex items-center">
              <div class="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
              <span>Access settings from the top-right menu</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class WelcomeComponent {}
