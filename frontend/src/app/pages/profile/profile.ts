import { Component, inject, signal, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.html',
})
export class ProfileComponent {
  private authService = inject(AuthService);
  private router      = inject(Router);

  user         = this.authService.user;
  activeTab    = signal<'profile' | 'orders' | 'addresses'>('profile');
  editingField = signal<string | null>(null);
  editValue    = signal('');

  startEdit(field: string, currentValue: string): void {
    this.editingField.set(field);
    this.editValue.set(currentValue);
  }

  saveEdit(field: keyof import('../../services/auth.service').User): void {
    this.authService.updateUser({ [field]: this.editValue() });
    this.editingField.set(null);
  }

  cancelEdit(): void {
    this.editingField.set(null);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}