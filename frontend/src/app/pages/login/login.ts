import { Component, signal, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  private router = inject(Router);

  email       = signal('');
  password    = signal('');
  showPass    = signal(false);
  isLoading   = signal(false);
  errorMsg    = signal('');

  onSubmit(): void {
    this.errorMsg.set('');

    // Validación básica
    if (!this.email() || !this.password()) {
      this.errorMsg.set('Please fill in all fields.');
      return;
    }
    if (!this.email().includes('@')) {
      this.errorMsg.set('Please enter a valid email address.');
      return;
    }

    // Simular llamada al backend
    // Cuando conectes Django: aquí va this.authService.login(email, password)
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      // Por ahora redirige al home
      this.router.navigate(['/']);
    }, 1500);
  }
}