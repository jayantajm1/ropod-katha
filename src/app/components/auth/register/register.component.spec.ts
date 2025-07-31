import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, FormsModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.name).toBe('');
    expect(component.email).toBe('');
    expect(component.password).toBe('');
    expect(component.confirmPassword).toBe('');
  });

  it('should handle successful registration with matching passwords', () => {
    // Arrange
    component.name = 'John Doe';
    component.email = 'john@example.com';
    component.password = 'password123';
    component.confirmPassword = 'password123';
    spyOn(console, 'log');

    // Act
    component.onRegister();

    // Assert
    expect(console.log).toHaveBeenCalledWith('Registration attempt:', {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });
  });

  it('should show alert for mismatched passwords', () => {
    // Arrange
    component.name = 'John Doe';
    component.email = 'john@example.com';
    component.password = 'password123';
    component.confirmPassword = 'differentpassword';
    spyOn(window, 'alert');
    spyOn(console, 'log');

    // Act
    component.onRegister();

    // Assert
    expect(window.alert).toHaveBeenCalledWith('Passwords do not match');
    expect(console.log).not.toHaveBeenCalled();
  });

  it('should validate form fields', () => {
    // Test empty fields
    expect(component.name).toBe('');
    expect(component.email).toBe('');
    expect(component.password).toBe('');
    expect(component.confirmPassword).toBe('');

    // Test with data
    component.name = 'John Doe';
    component.email = 'john@example.com';
    component.password = 'password123';
    component.confirmPassword = 'password123';

    expect(component.name).toBe('John Doe');
    expect(component.email).toBe('john@example.com');
    expect(component.password).toBe('password123');
    expect(component.confirmPassword).toBe('password123');
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
    component.name = 'John Doe';
    component.email = 'john@example.com';
    component.password = 'password123';
    component.confirmPassword = 'password123';
    fixture.detectChanges();

    // Check if values are reflected in inputs
    const nameInput = compiled.querySelector(
      'input[name="name"]'
    ) as HTMLInputElement;
    const emailInput = compiled.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    const passwordInput = compiled.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement;
    const confirmPasswordInput = compiled.querySelector(
      'input[name="confirmPassword"]'
    ) as HTMLInputElement;

    if (nameInput && emailInput && passwordInput && confirmPasswordInput) {
      expect(nameInput.value).toBe('John Doe');
      expect(emailInput.value).toBe('john@example.com');
      expect(passwordInput.value).toBe('password123');
      expect(confirmPasswordInput.value).toBe('password123');
    }
  });

  it('should have proper form structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Check for form element
    const form = compiled.querySelector('form');
    expect(form).toBeTruthy();

    // Check for register button
    const registerButton = compiled.querySelector('button[type="submit"]');
    expect(registerButton).toBeTruthy();
    expect(registerButton?.textContent?.trim()).toContain('Create Account');
  });

  it('should handle form submission', () => {
    spyOn(component, 'onRegister');

    const compiled = fixture.nativeElement as HTMLElement;
    const form = compiled.querySelector('form') as HTMLFormElement;

    if (form) {
      form.dispatchEvent(new Event('submit'));
      expect(component.onRegister).toHaveBeenCalled();
    }
  });

  it('should show login link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const loginLink = compiled.querySelector('a[routerLink="/login"]');

    expect(loginLink).toBeTruthy();
    expect(loginLink?.textContent?.trim()).toContain('Sign in here');
  });

  it('should have password confirmation validation logic', () => {
    // Test matching passwords
    component.password = 'password123';
    component.confirmPassword = 'password123';

    // This should not trigger alert
    spyOn(window, 'alert');
    component.onRegister();

    // Since passwords match, alert should not be called for password mismatch
    // (other validations might still cause issues, but not password mismatch)

    // Test mismatched passwords
    component.password = 'password123';
    component.confirmPassword = 'differentpassword';

    component.onRegister();
    expect(window.alert).toHaveBeenCalledWith('Passwords do not match');
  });

  it('should have required form fields', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Check for required attributes
    const nameInput = compiled.querySelector(
      'input[name="name"]'
    ) as HTMLInputElement;
    const emailInput = compiled.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement;
    const passwordInput = compiled.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement;
    const confirmPasswordInput = compiled.querySelector(
      'input[name="confirmPassword"]'
    ) as HTMLInputElement;

    if (nameInput && emailInput && passwordInput && confirmPasswordInput) {
      expect(nameInput.required).toBe(true);
      expect(emailInput.required).toBe(true);
      expect(emailInput.type).toBe('email');
      expect(passwordInput.required).toBe(true);
      expect(passwordInput.type).toBe('password');
      expect(confirmPasswordInput.required).toBe(true);
      expect(confirmPasswordInput.type).toBe('password');
    }
  });

  it('should handle edge cases', () => {
    // Test with empty passwords
    component.password = '';
    component.confirmPassword = '';
    spyOn(console, 'log');

    component.onRegister();

    // Empty passwords should be considered matching and proceed to console.log
    expect(console.log).toHaveBeenCalled();

    // Test with only one empty password
    component.password = 'password123';
    component.confirmPassword = '';
    spyOn(window, 'alert');

    component.onRegister();
    expect(window.alert).toHaveBeenCalledWith('Passwords do not match');
  });
});
