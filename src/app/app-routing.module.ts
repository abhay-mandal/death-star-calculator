import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppConstants } from './app.constants';

const routes: Routes = [
  {
    path: '',
    redirectTo: `/${AppConstants.APP_URLS.DASHBOARD}`,
    pathMatch: 'full',
  },
  { path: AppConstants.APP_URLS.DASHBOARD, loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: AppConstants.APP_URLS.POTENTIAL_REBEL, loadChildren: () => import('./modules/potential-rebel-enemies/potential-rebel-enemies.module').then(m => m.PotentialRebelEnemiesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
