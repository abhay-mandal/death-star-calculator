import { TestBed } from '@angular/core/testing';
import { AppTestConstants } from '@app/app.test.constants';
import { TranslateModule } from '@ngx-translate/core';

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
      spyMethods()
    })
  );

  it('should populate user details data on calling userDetailsData method', () => {
    service.userDetailsData = AppTestConstants.USER_DETAILS
    service["userDetails"].subscribe(userDetails=>{
      expect(userDetails).toEqual(AppTestConstants.USER_DETAILS);
    })
  });

  it('should set userDetails key value in sessionStorage on calling setSessionStorage method', () => {
    service.setSessionStorage('userDetails', AppTestConstants.USER_DETAILS);
    expect(sessionStorage.getItem("userDetails")).toBeNull()
  });

  it('should get userDetails key value from sessionStorage on calling getSessionStorage method', () => {
    service.setSessionStorage('userDetails', AppTestConstants.USER_DETAILS);

    service.getSessionStorage('userDetails');

    expect(sessionStorage.getItem("userDetails")).toEqual(JSON.stringify(AppTestConstants.USER_DETAILS))
  });

  it('should set activeId on calling activeId method', () => {
    service.activeId = "Test";

    service["activeIds"].subscribe(activeId=>{
      expect(activeId).toEqual("Test");
    })
  });

  

  it('should set UploadButtonDisableState flag on calling setUploadButtonDisableState method', () => {
    service.setUploadButtonDisableState = true;

    service["disableUploadDataButton"].subscribe(disableUploadDataButton=>{
      expect(disableUploadDataButton).toEqual(true);
    })
  });

  it('should set CheckErrorLimitFormValidity flag on calling setCheckErrorLimitFormValidity method', () => {
    service.setCheckErrorLimitFormValidity = true;

    service["checkErrorLimitFormValidity"].subscribe(checkErrorLimitFormValidity=>{
      expect(checkErrorLimitFormValidity).toEqual(true);
    })
  });
  
  it('should be created', () => {    
    expect(service).toBeTruthy();
  });

  function spyMethods(){    
    spyOnProperty(service,"userDetailsData", "set").and.callThrough()
    spyOnProperty(service,"selectedTheme", "set").and.callThrough()
    spyOnProperty(service,"activeId", "set").and.callThrough()
    spyOnProperty(service,"setUploadButtonDisableState", "set").and.callThrough()
    spyOnProperty(service,"setCheckErrorLimitFormValidity", "set").and.callThrough()
    
    spyOn(service,"setSessionStorage").and.callThrough()
    spyOn(service,"getSessionStorage").and.callThrough()    
  }
});
