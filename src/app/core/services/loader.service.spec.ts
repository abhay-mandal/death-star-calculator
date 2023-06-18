import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService

  beforeEach(() => TestBed.configureTestingModule({
      providers:[
        LoaderService
      ]
    })
    .compileComponents()
    .then(()=>{
      service = TestBed.inject(LoaderService);
      spyMethods()
    })
  );

  it('should set showLoader as true executing show method', () => {
    service.show()

    expect(service.showLoader).toBeTrue()
  });

  it('should set showLoader as false executing hide method', () => {
    service.hide()

    expect(service.showLoader).toBeFalse()
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  function spyMethods() {
    spyOn(service,"show").and.callThrough()
    spyOn(service,"hide").and.callThrough()        
  }
});
