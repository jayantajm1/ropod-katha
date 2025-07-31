import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerData = {
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  showPassword = false;
  acceptTerms = false;
  isLoading = false;

  constructor(private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  passwordsMatch(): boolean {
    return this.registerData.password === this.registerData.confirmPassword;
  }

  getPasswordStrengthClass(index: number): string {
    const password = this.registerData.password;
    const strength = this.calculatePasswordStrength(password);

    if (index < strength) {
      switch (strength) {
        case 1:
          return 'bg-red-500';
        case 2:
          return 'bg-yellow-500';
        case 3:
          return 'bg-blue-500';
        case 4:
          return 'bg-green-500';
        default:
          return 'bg-gray-300';
      }
    }
    return 'bg-gray-300';
  }

  getPasswordStrengthText(): string {
    const strength = this.calculatePasswordStrength(this.registerData.password);
    switch (strength) {
      case 0:
        return 'Enter a password';
      case 1:
        return 'Weak password';
      case 2:
        return 'Fair password';
      case 3:
        return 'Good password';
      case 4:
        return 'Strong password';
      default:
        return '';
    }
  }

  private calculatePasswordStrength(password: string): number {
    if (!password) return 0;

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    return Math.min(strength, 4);
  }

  async onSubmit() {
    if (!this.passwordsMatch()) {
      alert('Passwords do not match');
      return;
    }

    if (!this.acceptTerms) {
      alert('Please accept the terms and conditions');
      return;
    }

    this.isLoading = true;

    try {
      // Implement registration logic
      console.log('Registration attempt:', {
        fullName: this.registerData.fullName,
        email: this.registerData.email,
        username: this.registerData.username,
        password: this.registerData.password,
      });

      // Simulate successful registration and redirect
      // In a real app, you would call an auth service here
      alert('Registration successful! Please login.');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration');
    } finally {
      this.isLoading = false;
    }
  }

  // Keep the old method for backward compatibility
  onRegister() {
    this.onSubmit();
  }
}
