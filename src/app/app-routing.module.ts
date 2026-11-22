import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SamplePageComponent } from './sample-page/sample-page.component';
import { UserCreationComponent } from './user-creation/user-creation.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'users',
    component: MainLayoutComponent,
    children: [
      { path: '', component: UserCreationComponent },
      { path: 'dashboard', component: SamplePageComponent, data: { title: 'Dashboard' } },
      { path: 'employees', component: SamplePageComponent, data: { title: 'Employee List' } },
      { path: 'departments', component: SamplePageComponent, data: { title: 'Departments' } }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
