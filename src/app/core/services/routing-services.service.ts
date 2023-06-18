import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class RoutingServicesService {

  constructor(
    private router: Router
  ) { }

  goToDashboard() {
    this.router.navigate([`${AppConstants.APP_URLS.DASHBOARD}`]);
  }
  goToPotentialRebel() {
    this.router.navigate([`${AppConstants.APP_URLS.POTENTIAL_REBEL}`]);
  }
}
