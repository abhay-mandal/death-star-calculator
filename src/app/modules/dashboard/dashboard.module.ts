import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {MatButtonModule} from '@angular/material/button';
import {CdkTableModule} from '@angular/cdk/table';
import { NamePipe } from './pipe/name.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    NamePipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatButtonModule,
    CdkTableModule
  ]
})
export class DashboardModule { }
