import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { SharedModule } from '../../_shared/shared.module';
import { ManagerRoutingModule } from './manager-routing.module';
// COMPONENTS
import { ManagerMenuComponent } from './manager-menu/manager-menu.component';
import { ManagerComponent } from './manager.component';
import { OverviewComponent } from './overview/overview.component'

@NgModule({
  declarations: [
    ManagerComponent,
    ManagerMenuComponent,
    OverviewComponent,
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    RouterModule,
    // SharedModule,
  ]
})
export class ManagerModule { }