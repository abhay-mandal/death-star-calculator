import { TestBed } from '@angular/core/testing';
import { AppTestConstants } from 'src/app/app.test.constants';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService
  beforeEach(() => TestBed.configureTestingModule({
      providers:[
        DataService
      ]
    })
    .compileComponents()
    .then(()=>{
      service = TestBed.inject(DataService);
    })
  );

  it('should be created', () => {    
    expect(service).toBeTruthy();
  });

});
