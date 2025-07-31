import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messageStatus',
})
export class MessageStatusPipe implements PipeTransform {
  transform(status: 'sent' | 'delivered' | 'read'): string {
    switch (status) {
      case 'sent':
        return '✓'; // Single check
      case 'delivered':
        return '✓✓'; // Double check
      case 'read':
        return '✓✓'; // Double blue check (use CSS for color)
      default:
        return '';
    }
  }
}
