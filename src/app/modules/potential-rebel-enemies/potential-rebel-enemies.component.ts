import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, forkJoin } from 'rxjs';
import { AppConstants } from 'src/app/app.constants';
import { Enemy, EnemyObject, People, PotentailEnemy } from 'src/app/core/models/enemy.model';
import { DataService } from 'src/app/core/services/data.service';
import { HttpService } from 'src/app/core/services/http.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { RoutingServicesService } from 'src/app/core/services/routing-services.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-potential-rebel-enemies',
  templateUrl: './potential-rebel-enemies.component.html',
  styleUrls: ['./potential-rebel-enemies.component.scss']
})
export class PotentialRebelEnemiesComponent implements OnInit {

  searchText: FormControl = new FormControl('');
  minSearchTextLength = 2;
  filteredPeople$: People[] = [];
  selectedEnemies: EnemyObject = {} as EnemyObject;
  private BASE_URL = environment.BASE_URL;
  totalVolume = 0;
  objectkeys = Object.keys;

  constructor(
    private httpServ: HttpService,
    private dataServ: DataService,
    private routeServ: RoutingServicesService,
    private loaderServ: LoaderService
  ) { }

  ngOnInit(): void {
    this.searchText.valueChanges.pipe(
      filter((value: string) => (value.length >= this.minSearchTextLength)),
      debounceTime(500),
      distinctUntilChanged()
      ).subscribe(query => {
        this.searchPeople(query);
      })
  }

  searchPeople(query: string) {
    this.loaderServ.show();
    let params = new HttpParams().set("search", query);
    this.httpServ.get(`${this.BASE_URL}${AppConstants.API_END_POINT.PEOPLE}`, params).subscribe(resp => {
      this.loaderServ.hide();
      this.filteredPeople$ = resp.body.results.map((data: any) => new People(data));
      console.log("this.filteredPeople$", this.filteredPeople$);
    })
  }

  selectEnemy(option: People) {
    this.resetSelection();
    if (this.selectedEnemies[option.homeworld]) {
      if (this.isEnemyPresentInSamePlanet(option.id, this.selectedEnemies[option.homeworld])) {
        alert(option.name + " is present in Enemy list")
        return;
      }
      this.selectedEnemies[option.homeworld].push({ name: option.name, id: option.id });
    } else {
      this.selectedEnemies[option.homeworld] = [];
      this.selectedEnemies[option.homeworld].push({ name: option.name, id: option.id });
    }
    // console.log("selectedEnemies", this.selectedEnemies);
  }

  isEnemyPresentInSamePlanet(peopleId: number, selectedEnemies: Enemy[]) {
    return selectedEnemies.some(enemy => enemy.id === peopleId);
  }

  resetSelection() {
    this.searchText.setValue("");
    this.filteredPeople$ = [];
  }
  
  getPlanets(){

  }

  calculateEnemiesVolume() {
    this.loaderServ.show();
    let planetsRequestObs = [];
    for (let key in this.selectedEnemies) {
      planetsRequestObs.push(this.httpServ.get(key));
    }
    forkJoin(planetsRequestObs).subscribe((resp) => {
      // console.log(resp);
      this.totalVolume = 0;
      resp.forEach((planet) => {
        this.totalVolume += this.computePlanetVolume(+planet.body?.diameter);
      });
      this.loaderServ.hide();
    });
  }

  computePlanetVolume(diameter: number) {
    return (4 / 3) * Math.PI * Math.pow((diameter / 2), 3);
  }

  get potentialEnemiesName() {
    let names = [];
    for (let key in this.selectedEnemies) {
      for (let val of this.selectedEnemies[key]) {
        names.push(val.name);
      }
    }
    return names;
  }

  confirmPotentialRebelEnemy() {
    if (this.totalVolume) {
      this.dataServ.setPotentialEnemy = { names: this.potentialEnemiesName, volume: this.totalVolume };
      this.routeServ.goToDashboard();
    } else {
      if (confirm("You have not calculated Volume!\n Do you want to continue?") == true) {
        this.routeServ.goToDashboard();
      }
    }
  }

}
