import { Injectable, signal, computed } from '@angular/core';

export interface User {
  firstName: string;
  lastName:  string;
  email:     string;
  phone:     string;
  birthdate: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private currentUser = signal<User | null>(null);

  isLoggedIn = computed(() => this.currentUser() !== null);
  user       = computed(() => this.currentUser());

  login(email: string, password: string): boolean {
    // Simula login — después aquí va la llamada HTTP a Django
    this.currentUser.set({
      firstName: 'Alexander',
      lastName:  'Van Der Woodsen',
      email:     email,
      phone:     '+34 612 345 678',
      birthdate: '14 de Mayo, 1992',
    });
    return true;
  }

  logout(): void {
    this.currentUser.set(null);
  }

  updateUser(data: Partial<User>): void {
    const current = this.currentUser();
    if (current) {
      this.currentUser.set({ ...current, ...data });
    }
  }
}