/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('Service: User', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('Debería crearse', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
