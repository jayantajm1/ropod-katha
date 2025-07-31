import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Default redirect to login
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },

  // Auth routes
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
    title: 'Login - RopodKatha',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    title: 'Register - RopodKatha',
  },

  // Main application routes (protected by auth guard)
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/main/main.component').then((m) => m.MainComponent),
    canActivate: [AuthGuard],
    children: [
      // Default welcome screen
      {
        path: '',
        loadComponent: () =>
          import('./components/welcome/welcome.component').then(
            (m) => m.WelcomeComponent
          ),
        title: 'RopodKatha - Chat & Stories',
      },

      // Chat with specific contact
      {
        path: 'chat/:contactId',
        loadComponent: () =>
          import('./components/chat/chat.component').then(
            (m) => m.ChatComponent
          ),
        title: 'Chat - RopodKatha',
      },

      // Group chat
      {
        path: 'group/:groupId',
        loadComponent: () =>
          import('./components/chat/chat.component').then(
            (m) => m.ChatComponent
          ),
        title: 'Group Chat - RopodKatha',
      },
    ],
  },

  // Standalone routes
  {
    path: 'story/:storyId',
    loadComponent: () =>
      import('./components/story/story.component').then(
        (m) => m.StoryComponent
      ),
    canActivate: [AuthGuard],
    title: 'Story - RopodKatha',
  },

  // Settings routes
  {
    path: 'settings',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/settings/settings.component').then(
            (m) => m.SettingsComponent
          ),
        title: 'Settings - RopodKatha',
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./components/settings/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
        title: 'Profile Settings - RopodKatha',
      },
      {
        path: 'privacy',
        loadComponent: () =>
          import('./components/settings/privacy/privacy.component').then(
            (m) => m.PrivacyComponent
          ),
        title: 'Privacy Settings - RopodKatha',
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import(
            './components/settings/notifications/notifications.component'
          ).then((m) => m.NotificationsComponent),
        title: 'Notification Settings - RopodKatha',
      },
    ],
  },

  // Redirect rules
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },

  // 404 fallback
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
    title: 'Page Not Found - RopodKatha',
  },
];
