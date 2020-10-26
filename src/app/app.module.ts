import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// INTERCEPTORS
import { HeaderInterceptor } from './_helpers/header.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { CacheInterceptor } from './_helpers/cache.interceptor';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
/* LAYOUT MODULE */ 
import { AdminModule } from './_layouts/admin/admin.module';
import { ManagerModule } from './_layouts/manager/manager.module';
/* Material UI */
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
/* COMPONENTS */ 
import { AppComponent } from './app.component';
import { HomeComponent } from './_pages/home/home.component';
import { LoginComponent } from './_pages/login/login.component';
import { RegisterComponent } from './_pages/register/register.component';
import { AccessDeniedComponent } from './_pages/access-denied/access-denied.component';
import { PageNotFoundComponent } from './_pages/page-not-found/page-not-found.component';
import { ChangePasswordComponent } from './_pages/change-password/change-password.component';
import { ForgotPasswordComponent } from './_pages/forgot-password/forgot-password.component';
import { MessageComponent } from './_pages/message/message.component';
import { CelebrityComponent } from './_pages/celebrity/celebrity.component';
import { CelebsComponent } from './_pages/celebs/celebs.component';
import { CelebCreateComponent } from './_pages/celebs/celeb-create/celeb-create.component';
import { CelebListComponent } from './_pages/celebs/celeb-list/celeb-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AccessDeniedComponent,
    PageNotFoundComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    MessageComponent,
    CelebrityComponent,
    CelebsComponent,
    CelebCreateComponent,
    CelebListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AdminModule,
    ManagerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
