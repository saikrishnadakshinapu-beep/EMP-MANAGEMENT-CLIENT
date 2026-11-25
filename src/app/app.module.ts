import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
 import { MessageService } from 'primeng/api';
 import { DialogService } from 'primeng/dynamicdialog';
import { CommonSharedModule } from './common-shared/common-shared.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SamplePageComponent } from './sample-page/sample-page.component';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { AuthTokenInterceptor } from './services/auth-token.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainLayoutComponent,
    SamplePageComponent,
    UserCreationComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
   CommonSharedModule
  ],
 providers: [
    MessageService,
    DialogService,
    Title,
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
