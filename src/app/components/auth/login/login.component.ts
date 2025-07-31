import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
  };

  showPassword = false;
  rememberMe = false;
  isLoading = false;

  constructor(private router: Router, private authService: AuthService) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    if (this.loginData.email && this.loginData.password) {
      this.isLoading = true;

      try {
        const loginSuccess = this.authService.login(
          this.loginData.email,
          this.loginData.password
        );

        if (loginSuccess) {
          console.log('Login successful:', {
            email: this.loginData.email,
          });

          // Redirect to the main dashboard/chat
          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid credentials');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
      } finally {
        this.isLoading = false;
      }
    } else {
      alert('Please enter both email and password');
    }
  }

  // Keep the old method for backward compatibility
  onLogin() {
    this.onSubmit();
  }
}
