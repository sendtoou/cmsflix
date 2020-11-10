import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { RoleGuard } from './_guards/role.guard';
import { HomeComponent } from './_pages/home/home.component';
import { LoginComponent } from './_pages/login/login.component';
import { RegisterComponent } from './_pages/register/register.component';
import { AccessDeniedComponent } from './_pages/access-denied/access-denied.component';
import { PageNotFoundComponent } from './_pages/page-not-found/page-not-found.component';
import { CelebrityComponent } from './_pages/celebrity/celebrity.component';
import { CelebsComponent } from './_pages/celebs/celebs.component'
import { CelebTableComponent } from './_pages/celebs/celeb-table/celeb-table.component';
import { CelebLangComponent } from './_pages/celebs/celeb-lang/celeb-lang.component';
import { SerieSearchComponent } from './_pages/serie-search/serie-search.component';
import { SelectSearchComponent } from './_pages/select-search/select-search.component';
import { CompleteSearchComponent } from './_pages/complete-search/complete-search.component';
import { ChipSearchComponent } from './_pages/chip-search/chip-search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'accessdenied', component: AccessDeniedComponent},
  { path: 'pagenotfound', component: PageNotFoundComponent},
  { path: 'celebrity', component: CelebrityComponent},
  { path: 'celebs', component: CelebsComponent},
  { path: 'celebs-table', component: CelebTableComponent},
  { path: 'celebs-lang', component: CelebLangComponent},
  { path: 'serie-search', component: SerieSearchComponent},
  {path: 'select-search', component: SelectSearchComponent},
  {path:'complete-search', component: CompleteSearchComponent},
  {path: 'chip-search', component: ChipSearchComponent},
  {
    path: 'admin',
    loadChildren: () => import('./_layouts/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: { allowedRoles: ['admin', 'reviewer'] }
  },
  { path: 'manager',
    loadChildren: () => import('./_layouts/manager/manager.module').then(m => m.ManagerModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { allowedRoles: ['manager', 'supervisor'] }
  },
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
