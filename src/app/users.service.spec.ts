import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UsersService } from './users.service';
import { HttpClient } from '@angular/common/http';
import { Users } from './interfaces/user.interface';
import { userMock } from './mocks/user.mock';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService, HttpClient],
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return users', () => {
    service.getUsers().subscribe((response: Users[]) => {
      expect(response.length).toEqual(2);
    });

    // We set the expectations for the HttpClient mock
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(req.request.method).toEqual('GET');
    // Then we set the fake data to be returned by the mock
    req.flush(userMock);
  });

  it('should return error when API throws 404', () => {
    service.getUsers().subscribe(
      () => {},
      error => expect(error.status).toBe(404)
    );

    const mockRequest  = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    let error = new ErrorEvent('ERROR');
    mockRequest.error(error, { status: 404 ,statusText: 'Invalid access.'});
  });
});
