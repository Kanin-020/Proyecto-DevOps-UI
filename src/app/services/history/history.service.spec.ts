/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HistoryService } from './history.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('Service: History', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HistoryService]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('Debería crearse', inject([HistoryService], (service: HistoryService) => {
    expect(service).toBeTruthy();
  }));
});
