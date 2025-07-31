import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../../../models/contact.model';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  @Input() contact: Contact | null = null;
  @Input() showStatus: boolean = false;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() rounded: boolean = true;

  get sizeClasses(): string {
    const sizes = {
      xs: 'w-6 h-6 text-xs',
      sm: 'w-8 h-8 text-sm',
      md: 'w-10 h-10 text-base',
      lg: 'w-12 h-12 text-lg',
      xl: 'w-16 h-16 text-xl',
    };
    return sizes[this.size];
  }

  get statusIndicatorSize(): string {
    const sizes = {
      xs: 'w-2 h-2',
      sm: 'w-2.5 h-2.5',
      md: 'w-3 h-3',
      lg: 'w-3.5 h-3.5',
      xl: 'w-4 h-4',
    };
    return sizes[this.size];
  }

  get initials(): string {
    if (!this.contact?.name) return '??';

    const names = this.contact.name.trim().split(' ');
    if (names.length === 1) {
      return names[0].substring(0, 2).toUpperCase();
    }
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  }

  get backgroundColor(): string {
    if (!this.contact?.name) return 'bg-gray-400';

    // Generate consistent color based on name
    const colors = [
      'bg-red-500',
      'bg-orange-500',
      'bg-amber-500',
      'bg-yellow-500',
      'bg-lime-500',
      'bg-green-500',
      'bg-emerald-500',
      'bg-teal-500',
      'bg-cyan-500',
      'bg-sky-500',
      'bg-blue-500',
      'bg-indigo-500',
      'bg-violet-500',
      'bg-purple-500',
      'bg-fuchsia-500',
      'bg-pink-500',
    ];

    let hash = 0;
    for (let i = 0; i < this.contact.name.length; i++) {
      hash = this.contact.name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  }

  get isOnline(): boolean {
    return this.contact?.status?.online || false;
  }

  get hasAvatar(): boolean {
    return !!(this.contact?.avatar && this.contact.avatar.trim());
  }

  onImageError(event: any): void {
    // Hide the broken image and show initials fallback
    event.target.style.display = 'none';
  }
}
