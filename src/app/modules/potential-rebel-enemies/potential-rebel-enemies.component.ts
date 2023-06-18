import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, forkJoin } from 'rxjs';
import { AppConstants } from 'src/app/app.constants';
import { People, PotentailEnemy } from 'src/app/core/models/enemy.model';
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
  filteredPeople!: People[];
  selectedPeople: any = {};
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
      debounceTime(500)).subscribe(query => {
        this.searchPeople(query);
      })
  }

  searchPeople(query: string) {
    this.loaderServ.show();
    let params = new HttpParams().set("search", query);
    this.httpServ.get(`${this.BASE_URL}${AppConstants.API_END_POINT.PEOPLE}`, params).subscribe(resp => {
      this.loaderServ.hide();
      this.filteredPeople = resp.body.results;
    })
  }

  selectPeople(option: People) {
    this.resetSelection();
    this.selectedPeople[option.homeworld] = option.name;
  }

  resetSelection() {
    this.searchText.setValue("");
    this.filteredPeople = [];
  }

  calculateEnemy() {
    this.loaderServ.show();
    let sources = [];
    for (let key in this.selectedPeople) {
      sources.push(this.httpServ.get(key));
    }
    forkJoin(sources).subscribe((resp) => {
      console.log(resp);
      this.totalVolume = 0;
      resp.forEach((planet) => {
        this.totalVolume += this.computeEachVolume(+planet.body?.diameter);
      });
      this.loaderServ.hide();
      // console.log("total volume", this.totalVolume);
    });
  }

  computeEachVolume(diameter: number) {
    return (4 / 3) * Math.PI * Math.pow((diameter / 2), 3);
  }

  get potentialEnemiesName() {
    let names = [];
    for (let key in this.selectedPeople) {
      names.push(this.selectedPeople[key]);
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
