import { Component, OnInit } from '@angular/core';
import { DataService } from './core/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'death-star-calculator';

  constructor(private dataServ: DataService) {

  }

  ngOnInit(): void {
    this.assignSessionData();
  }


  assignSessionData() {
    this.dataServ.sessionStorage && (this.dataServ.assignSessionData = [...this.dataServ.sessionStorage]);
  }
}