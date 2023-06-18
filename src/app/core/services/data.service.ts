import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, take } from 'rxjs';
import { AppConstants } from 'src/app/app.constants';
import { PotentailEnemy } from '../models/enemy.model';

/**
 * This service class helps to save to store data temporary and can be accessed across application.
 * Data in this class gets reset on refresh of application (Refresh of browser).
 **/

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private potentailEnemies = new BehaviorSubject<PotentailEnemy[]>([]);
  public potentailEnemies$ = this.potentailEnemies.asObservable();

  constructor() { }

  set sessionStorage(param: any) {
    sessionStorage.setItem(param.key, JSON.stringify(param.value));
  }

  get sessionStorage() {
    return JSON.parse(sessionStorage.getItem(AppConstants.PTENTIAL_ENEMY)!);
  }

  set setPotentialEnemy(potentailEnemy: PotentailEnemy) {
    const updatedValue = [...this.potentailEnemies.value, potentailEnemy];
    this.potentailEnemies.next([...updatedValue]);
    this.sessionStorage = { key: AppConstants.PTENTIAL_ENEMY, value: [...updatedValue] };
  }

  set assignSessionData(potentailEnemy: PotentailEnemy[]){
    this.potentailEnemies.next([...potentailEnemy]);
  }

}
