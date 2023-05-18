/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaskService } from './task.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('Service: Task', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('Debería crearse', inject([TaskService], (service: TaskService) => {
    expect(service).toBeTruthy();
  }));
});
