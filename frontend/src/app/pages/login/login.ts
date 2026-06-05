import { Component, signal, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  private router      = inject(Router);
  private authService = inject(AuthService);

  email     = signal('');
  password  = signal('');
  showPass  = signal(false);
  isLoading = signal(false);
  errorMsg  = signal('');

  onSubmit(): void {
    this.errorMsg.set('');

    if (!this.email() || !this.password()) {
      this.errorMsg.set('Please fill in all fields.');
      return;
    }
    if (!this.email().includes('@')) {
      this.errorMsg.set('Please enter a valid email address.');
      return;
    }

    this.isLoading.set(true);
    setTimeout(() => {
      this.authService.login(this.email(), this.password());
      this.isLoading.set(false);
      this.router.navigate(['/profile']);
    }, 1500);
  }
}