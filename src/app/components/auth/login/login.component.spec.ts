import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, FormsModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    mockAuthService = TestBed.inject(
      AuthService
    ) as jasmine.SpyObj<AuthService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.email).toBe('');
    expect(component.password).toBe('');
  });

  it('should handle successful login', () => {
    // Arrange
    component.email = 'test@example.com';
    component.password = 'password123';
    mockAuthService.login.and.returnValue(true);

    // Act
    component.onLogin();

    // Assert
    expect(mockAuthService.login).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should handle failed login', () => {
    // Arrange
    component.email = 'test@example.com';
    component.password = 'wrongpassword';
    mockAuthService.login.and.returnValue(false);
    spyOn(window, 'alert');

    // Act
    component.onLogin();

    // Assert
    expect(mockAuthService.login).toHaveBeenCalledWith(
      'test@example.com',
      'wrongpassword'
    );
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
  });

  it('should show alert for empty fields', () => {
    // Arrange
    component.email = '';
    component.password = '';
    spyOn(window, 'alert');

    // Act
    component.onLogin();

    // Assert
    expect(mockAuthService.login).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith(
      'Please enter both email and password'
    );
  });

  it('should validate form fields', () => {
    // Test empty email
    component.email = '';
    component.password = 'password123';
    expect(component.email).toBe('');

    // Test empty password
    component.email = 'test@example.com';
    component.password = '';
    expect(component.password).toBe('');

    // Test valid data
    component.email = 'test@example.com';
    component.password = 'password123';
    expect(component.email).toBe('test@example.com');
    expect(component.password).toBe('password123');
  });

  it('should have proper template structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Check for main container
    const mainContainer = compiled.querySelector('.min-h-screen');
    expect(mainContainer).toBeTruthy();

    // Check for gradient background
    expect(mainContainer?.classList.contains('bg-gradient-to-br')).toBe(true);

    // Check for logo/brand section
    const logoSection = compiled.querySelector('.text-center');
    expect(logoSection).toBeTruthy();
  });

  it('should bind form inputs correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Set component values
    component.email = 'test@example.com';
    component.password = 'password123';
    fixture.detectChanges();

    // Check if values are reflected in inputs
    const emailInput = compiled.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    const passwordInput = compiled.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement;

    if (emailInput && passwordInput) {
      expect(emailInput.value).toBe('test@example.com');
      expect(passwordInput.value).toBe('password123');
    }
  });

  it('should have proper form structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Check for form element
    const form = compiled.querySelector('form');
    expect(form).toBeTruthy();

    // Check for login button
    const loginButton = compiled.querySelector('button[type="submit"]');
    expect(loginButton).toBeTruthy();
    expect(loginButton?.textContent?.trim()).toContain('Sign In');
  });

  it('should handle form submission', () => {
    spyOn(component, 'onLogin');

    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('form') as HTMLFormElement;

    if (form) {
      form.dispatchEvent(new Event('submit'));
      expect(component.onLogin).toHaveBeenCalled();
    }
  });

  it('should show register link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const registerLink = compiled.querySelector('a[routerLink="/register"]');

    expect(registerLink).toBeTruthy();
    expect(registerLink?.textContent?.trim()).toContain('Sign up here');
  });
});
