import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { OverviewComponent } from './overview/overview.component';
// import { CaseComponent } from 'src/app/pages/user/case/case.component';
// import { SuggestComponent } from 'src/app/pages/user/suggest/suggest.component';
// import { OverviewComponent } from 'src/app/pages/user/overview/overview.component';

const routes: Routes = [
  {
    path: '', component: ManagerComponent,
    children: [
      { path: '', component: OverviewComponent },
      { path: 'overview', component: OverviewComponent },
      // { path: 'case', component: CaseComponent },
      // { path: 'suggest', component: SuggestComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
