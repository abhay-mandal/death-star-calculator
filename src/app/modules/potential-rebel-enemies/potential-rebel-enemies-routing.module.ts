import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PotentialRebelEnemiesComponent } from './potential-rebel-enemies.component';

const routes: Routes = [{ path: '', component: PotentialRebelEnemiesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PotentialRebelEnemiesRoutingModule { }
