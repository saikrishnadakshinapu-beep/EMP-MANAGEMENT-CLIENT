import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface SidebarItem {
  label: string;
  route: string;
  icon: string;
  exact?: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private readonly router: Router) {}

  readonly items: SidebarItem[] = [
    { label: 'Create User', route: '/users', icon: 'pi pi-user', exact: true },
    { label: 'Dashboard', route: '/users/dashboard', icon: 'pi pi-home' },
    { label: 'Employee List', route: '/users/employees', icon: 'pi pi-users' },
    { label: 'Departments', route: '/users/departments', icon: 'pi pi-th-large' }
  ];

  navigate(route: string) {
    void this.router.navigate([route]);
  }

  isActive(route: string) {
    return this.router.isActive(route, route === '/users');
  }
}
