import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../_shared/shared.module';
/* COMPONENTS */
import { AdminComponent } from './admin.component';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TabListComponent } from './tab-list/tab-list.component';
import { AddSerieComponent } from './series/add-serie/add-serie.component'
import { SerieInfoComponent } from './series/serie-info/serie-info.component'
import { EspisodeComponent } from './series/espisode/espisode.component'
/* MATERIAL UI */
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { TabComponent } from './tab/tab.component';
import { SeriesComponent } from './series/series.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AdminComponent,
    AdminMenuComponent,
    DashboardComponent,
    TabListComponent,
    TabComponent,
    SeriesComponent,
    AddSerieComponent,
    SerieInfoComponent,
    EspisodeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ]
})
export class AdminModule { }
