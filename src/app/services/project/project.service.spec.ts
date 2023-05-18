/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectService } from './project.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('Service: Project', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('Debería crearse', inject([ProjectService], (service: ProjectService) => {
    expect(service).toBeTruthy();
  }));
});
