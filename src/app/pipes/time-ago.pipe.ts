import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date | string | number, showDetailed: boolean = false): string {
    if (!value) return '';
    
    const date = new Date(value);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    // If showDetailed is true, show more precise formatting
    if (showDetailed) {
      return this.formatDetailed(diffInSeconds);
    }

    // For chat messages, show contextual time
    return this.formatChatTime(date, now, diffInSeconds);
  }

  private formatChatTime(date: Date, now: Date, diffInSeconds: number): string {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    // Less than a minute ago
    if (diffInSeconds < 60) {
      return 'Just now';
    }
    
    // Less than an hour ago
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    }
    
    // Today
    if (this.isToday(date, now)) {
      return this.formatTime(date);
    }
    
    // Yesterday
    if (this.isYesterday(date, now)) {
      return 'Yesterday';
    }
    
    // This week (within 7 days)
    if (diffInDays < 7) {
      return this.getDayName(date);
    }
    
    // This year
    if (date.getFullYear() === now.getFullYear()) {
      return this.formatDate(date, false);
    }
    
    // Different year
    return this.formatDate(date, true);
  }

  private formatDetailed(diffInSeconds: number): string {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInSeconds < 60) {
      return diffInSeconds <= 0 ? 'Just now' : `${diffInSeconds} seconds ago`;
    } else if (diffInMinutes < 60) {
      return diffInMinutes === 1 ? '1 minute ago' : `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
    } else if (diffInDays < 7) {
      return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
    } else if (diffInWeeks < 4) {
      return diffInWeeks === 1 ? '1 week ago' : `${diffInWeeks} weeks ago`;
    } else if (diffInMonths < 12) {
      return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
    } else {
      return diffInYears === 1 ? '1 year ago' : `${diffInYears} years ago`;
    }
  }

  private isToday(date: Date, now: Date): boolean {
    return date.toDateString() === now.toDateString();
  }

  private isYesterday(date: Date, now: Date): boolean {
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    return date.toDateString() === yesterday.toDateString();
  }

  private formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  private getDayName(date: Date): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }

  private formatDate(date: Date, includeYear: boolean): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const month = months[date.getMonth()];
    const day = date.getDate();
    
    if (includeYear) {
      return `${month} ${day}, ${date.getFullYear()}`;
    }
    
    return `${month} ${day}`;
  }
}
