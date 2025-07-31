import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, interval, takeUntil } from 'rxjs';
import { Story } from '../../models/story.model';
import { Contact } from '../../models/contact.model';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';

export interface StoryViewData {
  story: Story;
  contact: Contact;
  currentIndex: number;
  totalStories: number;
}

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [CommonModule, FormsModule, TimeAgoPipe],
  templateUrl: './story.component.html',
  styleUrl: './story.component.scss',
})
export class StoryComponent implements OnInit, OnDestroy {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('storyContainer') storyContainer!: ElementRef;

  @Input() stories: Story[] = [];
  @Input() contacts: Contact[] = [];
  @Input() currentStoryIndex = 0;
  @Input() autoPlay = true;
  @Input() showProgress = true;
  @Input() allowInteraction = true;

  @Output() storyChanged = new EventEmitter<number>();
  @Output() storyClosed = new EventEmitter<void>();
  @Output() storyViewed = new EventEmitter<Story>();
  @Output() storyReply = new EventEmitter<{ story: Story; message: string }>();
  @Output() storyShare = new EventEmitter<Story>();
  @Output() storyReport = new EventEmitter<Story>();

  currentStory: Story | null = null;
  currentContact: Contact | null = null;
  isPlaying = false;
  isPaused = false;
  progress = 0;
  storyDuration = 5000; // 5 seconds for images, video duration for videos
  timeRemaining = 0;
  showReplyInput = false;
  replyMessage = '';
  showMenu = false;
  isLoading = true;
  hasError = false;

  private destroy$ = new Subject<void>();
  private progressInterval$ = new Subject<void>();
  private startTime = 0;
  private pausedTime = 0;

  ngOnInit(): void {
    this.loadCurrentStory();
    if (this.autoPlay) {
      this.playStory();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.stopProgress();
  }

  private loadCurrentStory(): void {
    if (this.stories.length === 0) return;

    this.currentStory = this.stories[this.currentStoryIndex];
    this.currentContact =
      this.contacts.find((c) => c.id === this.currentStory?.userId) || null;

    // Reset state
    this.progress = 0;
    this.isLoading = true;
    this.hasError = false;
    this.isPaused = false;

    // Set duration based on media type
    if (this.currentStory?.mediaType === 'video') {
      // Duration will be set when video loads
      this.storyDuration = 15000; // Default 15s, will be updated
    } else {
      this.storyDuration = 5000; // 5s for images and text
    }

    this.timeRemaining = this.storyDuration;

    // Mark as viewed
    if (this.currentStory && !this.currentStory.isViewed) {
      this.storyViewed.emit(this.currentStory);
    }
  }

  private playStory(): void {
    if (!this.currentStory) return;

    this.isPlaying = true;
    this.startTime = Date.now() - this.pausedTime;
    this.startProgress();
  }

  private pauseStory(): void {
    this.isPlaying = false;
    this.isPaused = true;
    this.pausedTime = Date.now() - this.startTime;
    this.stopProgress();
  }

  private startProgress(): void {
    this.stopProgress();

    interval(50)
      .pipe(takeUntil(this.progressInterval$), takeUntil(this.destroy$))
      .subscribe(() => {
        if (!this.isPlaying) return;

        const elapsed = Date.now() - this.startTime;
        this.progress = Math.min((elapsed / this.storyDuration) * 100, 100);
        this.timeRemaining = Math.max(this.storyDuration - elapsed, 0);

        if (this.progress >= 100) {
          this.nextStory();
        }
      });
  }

  private stopProgress(): void {
    this.progressInterval$.next();
  }

  // Navigation methods
  nextStory(): void {
    if (this.currentStoryIndex < this.stories.length - 1) {
      this.currentStoryIndex++;
      this.storyChanged.emit(this.currentStoryIndex);
      this.loadCurrentStory();
      if (this.autoPlay) {
        this.playStory();
      }
    } else {
      this.closeStory();
    }
  }

  previousStory(): void {
    if (this.currentStoryIndex > 0) {
      this.currentStoryIndex--;
      this.storyChanged.emit(this.currentStoryIndex);
      this.loadCurrentStory();
      if (this.autoPlay) {
        this.playStory();
      }
    }
  }

  closeStory(): void {
    this.stopProgress();
    this.storyClosed.emit();
  }

  // Touch/Click handlers
  onStoryTap(event: MouseEvent | TouchEvent): void {
    if (!this.allowInteraction) return;

    const element = this.storyContainer.nativeElement;
    const rect = element.getBoundingClientRect();
    const x = 'clientX' in event ? event.clientX : event.touches[0].clientX;
    const clickPosition = (x - rect.left) / rect.width;

    if (clickPosition < 0.3) {
      this.previousStory();
    } else if (clickPosition > 0.7) {
      this.nextStory();
    } else {
      this.togglePlayPause();
    }
  }

  onStoryHold(): void {
    this.pauseStory();
  }

  onStoryRelease(): void {
    if (this.isPaused && this.autoPlay) {
      this.playStory();
    }
  }

  togglePlayPause(): void {
    if (this.isPlaying) {
      this.pauseStory();
    } else {
      this.playStory();
    }
  }

  // Media event handlers
  onImageLoad(): void {
    this.isLoading = false;
    this.hasError = false;
  }

  onImageError(): void {
    this.isLoading = false;
    this.hasError = true;
  }

  onVideoLoad(): void {
    const video = this.videoPlayer?.nativeElement;
    if (video) {
      this.storyDuration = video.duration * 1000; // Convert to milliseconds
      this.timeRemaining = this.storyDuration;
    }
    this.isLoading = false;
    this.hasError = false;
  }

  onVideoError(): void {
    this.isLoading = false;
    this.hasError = true;
  }

  onVideoEnded(): void {
    this.nextStory();
  }

  // Interaction methods
  toggleReplyInput(): void {
    this.showReplyInput = !this.showReplyInput;
    if (this.showReplyInput) {
      this.pauseStory();
    } else if (this.autoPlay) {
      this.playStory();
    }
  }

  sendReply(): void {
    if (this.replyMessage.trim() && this.currentStory) {
      this.storyReply.emit({
        story: this.currentStory,
        message: this.replyMessage.trim(),
      });
      this.replyMessage = '';
      this.showReplyInput = false;
      if (this.autoPlay) {
        this.playStory();
      }
    }
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
    if (this.showMenu) {
      this.pauseStory();
    } else if (this.autoPlay) {
      this.playStory();
    }
  }

  shareStory(): void {
    if (this.currentStory) {
      this.storyShare.emit(this.currentStory);
      this.showMenu = false;
    }
  }

  reportStory(): void {
    if (this.currentStory) {
      this.storyReport.emit(this.currentStory);
      this.showMenu = false;
    }
  }

  // Keyboard navigation
  onKeyDown(event: KeyboardEvent): void {
    if (!this.allowInteraction) return;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.previousStory();
        break;
      case 'ArrowRight':
      case ' ':
        event.preventDefault();
        this.nextStory();
        break;
      case 'Escape':
        event.preventDefault();
        this.closeStory();
        break;
      case 'Enter':
        event.preventDefault();
        this.togglePlayPause();
        break;
    }
  }

  // Utility methods
  get progressSegments(): number[] {
    return Array.from({ length: this.stories.length }, (_, i) => i);
  }

  getSegmentProgress(index: number): number {
    if (index < this.currentStoryIndex) return 100;
    if (index > this.currentStoryIndex) return 0;
    return this.progress;
  }

  get formattedTimeRemaining(): string {
    const seconds = Math.ceil(this.timeRemaining / 1000);
    return `${seconds}s`;
  }

  get isImageStory(): boolean {
    return (
      !this.currentStory?.mediaType || this.currentStory.mediaType === 'image'
    );
  }

  get isVideoStory(): boolean {
    return this.currentStory?.mediaType === 'video';
  }

  get isTextStory(): boolean {
    return !this.currentStory?.mediaUrl && !!this.currentStory?.content;
  }

  get storyBackgroundColor(): string {
    // Generate a gradient background for text stories
    const colors = [
      'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(45deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(45deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(45deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(45deg, #30cfd0 0%, #91a7ff 100%)',
      'linear-gradient(45deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(45deg, #ff9a9e 0%, #fecfef 100%)',
    ];

    if (!this.currentStory?.userId) return colors[0];

    let hash = 0;
    for (let i = 0; i < this.currentStory.userId.length; i++) {
      hash = this.currentStory.userId.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  }
}
