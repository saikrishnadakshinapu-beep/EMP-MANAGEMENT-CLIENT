import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly messageService: MessageService
  ) {}

  logout(): void {
    this.authService.logoutSession().subscribe({
      next: () => void this.router.navigate(['/login']),
      error: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Logged out locally',
          detail: 'The server could not invalidate this session.'
        });
        void this.router.navigate(['/login']);
      }
    });
  }
}
