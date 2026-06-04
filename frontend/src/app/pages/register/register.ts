import { Component, signal, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './register.html',
})
export class RegisterComponent {
  private router = inject(Router);

  firstName = signal('');
  lastName  = signal('');
  email     = signal('');
  password  = signal('');
  confirm   = signal('');
  showPass  = signal(false);
  isLoading = signal(false);
  errorMsg  = signal('');

  onSubmit(): void {
    this.errorMsg.set('');

    if (!this.firstName() || !this.lastName() || !this.email() || !this.password()) {
      this.errorMsg.set('Please fill in all fields.');
      return;
    }
    if (!this.email().includes('@')) {
      this.errorMsg.set('Please enter a valid email address.');
      return;
    }
    if (this.password().length < 8) {
      this.errorMsg.set('Password must be at least 8 characters.');
      return;
    }
    if (this.password() !== this.confirm()) {
      this.errorMsg.set('Passwords do not match.');
      return;
    }

    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.router.navigate(['/']);
    }, 1500);
  }
}