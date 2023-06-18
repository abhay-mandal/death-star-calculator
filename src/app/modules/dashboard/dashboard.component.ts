import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { PotentailEnemy } from 'src/app/core/models/enemy.model';
import { DataService } from 'src/app/core/services/data.service';
import { RoutingServicesService } from 'src/app/core/services/routing-services.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  potentialEnemies$: PotentailEnemy[] = [];
  displayedColumns: string[] = ['names', 'volume'];

  constructor(
    private routeServ: RoutingServicesService,
    private dataServ: DataService
  ) { }

  ngOnInit(): void {
    this.dataServ.potentailEnemies$.pipe(take(1)).subscribe((potentialEnemies: PotentailEnemy[]) => {
      this.potentialEnemies$ = potentialEnemies;
      console.log("potentialEnemies", potentialEnemies);
    })
  }

  newCalculation() {
    this.routeServ.goToPotentialRebel();
  }


}
