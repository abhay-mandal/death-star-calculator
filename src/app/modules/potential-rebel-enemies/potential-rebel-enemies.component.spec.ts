import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialRebelEnemiesComponent } from './potential-rebel-enemies.component';

describe('PotentialRebelEnemiesComponent', () => {
  let component: PotentialRebelEnemiesComponent;
  let fixture: ComponentFixture<PotentialRebelEnemiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotentialRebelEnemiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotentialRebelEnemiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
