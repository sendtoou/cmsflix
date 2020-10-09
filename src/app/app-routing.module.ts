import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { RoleGuard } from './_guards/role.guard';
import { HomeComponent } from './_pages/home/home.component';
import { LoginComponent } from './_pages/login/login.component';
import { RegisterComponent } from './_pages/register/register.component';
import { AccessDeniedComponent } from './_pages/access-denied/access-denied.component';
import { PageNotFoundComponent } from './_pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'accessdenied', component: AccessDeniedComponent},
  { path: 'pagenotfound', component: PageNotFoundComponent},
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
