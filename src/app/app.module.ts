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
/* ALERT MODULE */ 
import { AlertModule } from 'src/app/_pages/alert/alert.module' 
/* Material UI */
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatListModule } from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
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
import { CelebTableComponent } from './_pages/celebs/celeb-table/celeb-table.component';
import { CelebLangComponent } from './_pages/celebs/celeb-lang/celeb-lang.component';
import { SerieSearchComponent } from './_pages/serie-search/serie-search.component';
import { SelectSearchComponent } from './_pages/select-search/select-search.component';
import { CompleteSearchComponent } from './_pages/complete-search/complete-search.component';
import { ChipSearchComponent } from './_pages/chip-search/chip-search.component';
import { AddSerieComponent } from './_pages/add-serie/add-serie.component';
import { AddPersonComponent } from './_pages/add-person/add-person.component';
import { AddGenreComponent } from './_pages/add-genre/add-genre.component';
import { GenreComponent } from './_pages/genre/genre.component';
import { GenreCreateComponent } from './_pages/genre/genre-create/genre-create.component';
import { GenreListComponent } from './_pages/genre/genre-list/genre-list.component';
// import { AlertComponent } from './_pages/alert/alert.component';
import { PersonComponent } from './_pages/person/person.component';
import { PersonCreateComponent } from './_pages/person/person-create/person-create.component';

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
    CelebTableComponent,
    CelebLangComponent,
    SerieSearchComponent,
    SelectSearchComponent,
    CompleteSearchComponent,
    ChipSearchComponent,
    AddSerieComponent,
    AddPersonComponent,
    AddGenreComponent,
    GenreComponent,
    GenreCreateComponent,
    GenreListComponent,
    // AlertComponent,
    PersonComponent,
    PersonCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AlertModule,
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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    MatChipsModule,
    MatAutocompleteModule
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
