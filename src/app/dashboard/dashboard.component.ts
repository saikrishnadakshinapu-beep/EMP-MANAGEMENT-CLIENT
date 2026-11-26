import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService, AuthSession } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sessions: AuthSession[] = [];
  isLoadingSessions = true;
  sessionsError = '';

  constructor(private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getSessions().subscribe({
      next: response => {
        this.sessions = response.sessions;
        this.isLoadingSessions = false;
      },
      error: error => {
        this.sessionsError = error instanceof HttpErrorResponse && typeof error.error?.message === 'string'
          ? error.error.message
          : 'Unable to load active sessions.';
        this.isLoadingSessions = false;
      }
    });
  }
}
