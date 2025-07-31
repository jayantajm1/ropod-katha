import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="text-center p-8">
        <div class="mb-6">
          <h1 class="text-9xl font-bold text-gray-300">404</h1>
        </div>
        <h2 class="text-3xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p class="text-gray-500 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          routerLink="/"
          class="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <svg
            class="w-5 h-5 mr-2"
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
  `,
  styles: [],
})
export class NotFoundComponent {}
