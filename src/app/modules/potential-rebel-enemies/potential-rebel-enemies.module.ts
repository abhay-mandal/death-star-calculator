import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PotentialRebelEnemiesRoutingModule } from './potential-rebel-enemies-routing.module';
import { PotentialRebelEnemiesComponent } from './potential-rebel-enemies.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    PotentialRebelEnemiesComponent
  ],
  imports: [
    CommonModule,
    PotentialRebelEnemiesRoutingModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatButtonModule
  ]
})
export class PotentialRebelEnemiesModule { }
