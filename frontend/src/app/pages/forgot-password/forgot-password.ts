import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './forgot-password.html',
})
export class ForgotPasswordComponent {
  email     = signal('');
  isLoading = signal(false);
  sent      = signal(false);
  errorMsg  = signal('');

  onSubmit(): void {
    this.errorMsg.set('');

    if (!this.email() || !this.email().includes('@')) {
      this.errorMsg.set('Please enter a valid email address.');
      return;
    }

    // Simular envío — después aquí va this.authService.forgotPassword(email)
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.sent.set(true);
    }, 1500);
  }
}