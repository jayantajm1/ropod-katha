import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have proper template structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Check for main container
    const mainContainer = compiled.querySelector('.flex-1');
    expect(mainContainer).toBeTruthy();

    // Check for gradient background
    expect(mainContainer?.classList.contains('bg-gradient-to-br')).toBe(true);
  });

  it('should display welcome title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('h1');

    expect(title).toBeTruthy();
    expect(title?.textContent?.trim()).toContain('Welcome to RopodKatha');
  });

  it('should display welcome subtitle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const subtitle = compiled.querySelector('p');

    expect(subtitle).toBeTruthy();
    expect(subtitle?.textContent?.trim()).toContain(
      'Your conversations are waiting'
    );
  });

  it('should display feature cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const featureCards = compiled.querySelectorAll('.bg-white\\/80');

    expect(featureCards.length).toBe(4); // 3 feature cards + 1 quick start card
  });

  it('should display real-time chat feature', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const chatFeature = compiled.querySelector('h3');

    expect(chatFeature?.textContent?.trim()).toBe('Real-time Chat');
  });

  it('should display stories feature', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const features = compiled.querySelectorAll('h3');
    const storiesFeature = Array.from(features).find(
      (h3) => h3.textContent?.trim() === 'Stories'
    );

    expect(storiesFeature).toBeTruthy();
  });

  it('should display secure feature', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const features = compiled.querySelectorAll('h3');
    const secureFeature = Array.from(features).find(
      (h3) => h3.textContent?.trim() === 'Secure'
    );

    expect(secureFeature).toBeTruthy();
  });

  it('should display action buttons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');

    expect(buttons.length).toBe(2);

    const startChatButton = Array.from(buttons).find((btn) =>
      btn.textContent?.trim().includes('Start New Chat')
    );
    const createStoryButton = Array.from(buttons).find((btn) =>
      btn.textContent?.trim().includes('Create Story')
    );

    expect(startChatButton).toBeTruthy();
    expect(createStoryButton).toBeTruthy();
  });

  it('should display quick start section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const quickStart = compiled.querySelector('h3');
    const quickStartTitle = Array.from(compiled.querySelectorAll('h3')).find(
      (h3) => h3.textContent?.trim() === 'Quick Start'
    );

    expect(quickStartTitle).toBeTruthy();
  });

  it('should display quick start tips', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tips = compiled.querySelectorAll('.flex.items-center');

    expect(tips.length).toBeGreaterThanOrEqual(4); // At least 4 quick start tips
  });

  it('should have proper gradient styling', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const mainContainer = compiled.querySelector('.bg-gradient-to-br');

    expect(mainContainer?.classList.contains('from-slate-50')).toBeTruthy();
    expect(mainContainer?.classList.contains('via-blue-50')).toBeTruthy();
    expect(mainContainer?.classList.contains('to-indigo-50')).toBeTruthy();
  });

  it('should have responsive design classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const featureGrid = compiled.querySelector('.grid.md\\:grid-cols-3');

    expect(featureGrid).toBeTruthy();
  });

  it('should have hover effects', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const featureCards = compiled.querySelectorAll('.hover\\:shadow-xl');

    expect(featureCards.length).toBeGreaterThan(0);
  });

  it('should have animated elements', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const animatedElements = compiled.querySelectorAll('.animate-pulse');

    expect(animatedElements.length).toBeGreaterThan(0);
  });

  it('should have backdrop blur effects', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const blurElements = compiled.querySelectorAll('.backdrop-blur-sm');

    expect(blurElements.length).toBeGreaterThan(0);
  });

  it('should have proper icon displays', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const icons = compiled.querySelectorAll('svg');

    expect(icons.length).toBeGreaterThan(5); // Multiple icons throughout the component
  });

  it('should have proper color scheme', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Check for gradient text
    const gradientText = compiled.querySelector('.bg-clip-text');
    expect(gradientText).toBeTruthy();

    // Check for colored feature icons
    const coloredIcons = compiled.querySelectorAll('.bg-gradient-to-r');
    expect(coloredIcons.length).toBeGreaterThan(0);
  });

  it('should be accessible', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Check for proper heading hierarchy
    const h1 = compiled.querySelector('h1');
    const h3s = compiled.querySelectorAll('h3');

    expect(h1).toBeTruthy();
    expect(h3s.length).toBeGreaterThan(0);

    // Check for alt text on icons (SVGs should have proper attributes)
    const svgs = compiled.querySelectorAll('svg');
    svgs.forEach((svg) => {
      expect(svg.getAttribute('viewBox')).toBeTruthy();
    });
  });

  it('should have proper text content', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Check for feature descriptions
    const descriptions = compiled.querySelectorAll('p');
    const chatDescription = Array.from(descriptions).find((p) =>
      p.textContent?.includes('Instant messaging')
    );
    const storiesDescription = Array.from(descriptions).find((p) =>
      p.textContent?.includes('Share moments')
    );
    const secureDescription = Array.from(descriptions).find((p) =>
      p.textContent?.includes('End-to-end encryption')
    );

    expect(chatDescription).toBeTruthy();
    expect(storiesDescription).toBeTruthy();
    expect(secureDescription).toBeTruthy();
  });

  it('should have proper button styling', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');

    buttons.forEach((button) => {
      expect(button.classList.contains('transition-all')).toBeTruthy();
    });
  });
});
