import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Check if user was previously logged in (in a real app, check token/session)
    const savedAuth = localStorage.getItem('isAuthenticated');
    if (savedAuth === 'true') {
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(email: string, password: string): boolean {
    // Simple demo validation - in real app, validate with backend
    if (email && password) {
      this.isAuthenticatedSubject.next(true);
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('isAuthenticated');
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
