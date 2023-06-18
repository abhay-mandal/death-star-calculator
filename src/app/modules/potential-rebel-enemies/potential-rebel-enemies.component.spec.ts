import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DataService } from 'src/app/core/services/data.service';
import { HttpService } from 'src/app/core/services/http.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { RoutingServicesService } from 'src/app/core/services/routing-services.service';
import { PotentialRebelEnemiesComponent } from './potential-rebel-enemies.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { of, delay } from 'rxjs';
import { AppTestConstants } from 'src/app/app.test.constants';

describe('PotentialRebelEnemiesComponent', () => {
  let component: PotentialRebelEnemiesComponent;
  let httpService: HttpService;
  let loaderServiceMock: LoaderService;
  let fixture: ComponentFixture<PotentialRebelEnemiesComponent>;

  const PEOPLE_MOCK_DATA = AppTestConstants.people;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatAutocompleteModule
      ],
      declarations: [PotentialRebelEnemiesComponent],
      providers: [
        HttpService,
        DataService,
        RoutingServicesService,
        LoaderService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PotentialRebelEnemiesComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(HttpService);
    loaderServiceMock = TestBed.inject(LoaderService);

    spyOn(loaderServiceMock, "show").and.callThrough()
    spyOn(loaderServiceMock, "hide").and.callThrough()

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search people list', fakeAsync(() => {
    getPeopleSpyOn();
    component.searchPeople('test');
    tick(500);
    expect(component.filteredPeople$[0].homeworld).toContain(PEOPLE_MOCK_DATA.results[0].homeworld);
  }));

  it('should compute Enemies total volume', fakeAsync(() => {
    const SELECTED_ENEMIES = {
      [AppTestConstants.planet1.url]: [{ name: PEOPLE_MOCK_DATA.results[0].name, id: 1 }]
    };
    spyOn(httpService, "get").and.callFake(() => {
      return of({ body: AppTestConstants.planet1 }).pipe(delay(500));
    });
    component.selectedEnemies = SELECTED_ENEMIES;
    component.calculateEnemiesVolume();
    tick(500);

    // Asserts
    expect(loaderServiceMock.show).toHaveBeenCalled();
    expect(httpService.get).toHaveBeenCalledWith(AppTestConstants.planet1.url);
    expect(component.totalVolume).toBe(AppTestConstants.planet1Volume);
    expect(loaderServiceMock.hide).toHaveBeenCalled();
  }));


  it('should calculate volume correctly on a given diameter', () => {
    const expectedVolume = (4 / 3) * Math.PI * Math.pow(+AppTestConstants.planet1.diameter / 2, 3);
    let volume = component.computePlanetVolume(+AppTestConstants.planet1.diameter);
    expect(volume).toBe(AppTestConstants.planet1Volume);
    expect(volume).toBe(expectedVolume);
  });


  function getPeopleSpyOn() {
    spyOn(httpService, "get").and.callFake(() => {
      return of({ body: PEOPLE_MOCK_DATA }).pipe(delay(500));
    });
  }

});
