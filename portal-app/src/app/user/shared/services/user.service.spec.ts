import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UserService} from './user.service';
import {TEST_USERS} from '../models/test/users';

describe('UserService', () => {
  const TEST_USER = TEST_USERS[0];
  let userService: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService
      ]
    });

    userService = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should create a user', () => {
    const endpoint = `http://localhost:8080/user-portal/users`;

    userService.createUser(TEST_USER).subscribe(
      (results) => expect(results).toEqual(TEST_USER)
    );

    const mockReq = httpMock.expectOne(endpoint);
    mockReq.flush(TEST_USER);

    expect(mockReq.request.url).toEqual(endpoint);
    expect(mockReq.request.method).toEqual('POST');
  });

  it('should find all users', () => {
    const endpoint = `http://localhost:8080/user-portal/users`;

    userService.findAllUsers().subscribe(
      (results) => expect(results).toEqual(TEST_USERS)
    );

    const mockReq = httpMock.expectOne(endpoint);
    mockReq.flush(TEST_USERS);

    expect(mockReq.request.url).toEqual(endpoint);
    expect(mockReq.request.method).toEqual('GET');
  });

  it('should find all users by first name', () => {
    const endpoint = `http://localhost:8080/user-portal/users/asc`;

    userService.findAllUsersByFirstName().subscribe(
      (results) => expect(results).toEqual(TEST_USERS)
    );

    const mockReq = httpMock.expectOne(endpoint);
    mockReq.flush(TEST_USERS);

    expect(mockReq.request.url).toEqual(endpoint);
    expect(mockReq.request.method).toEqual('GET');
  });

  it('should update a user', () => {
    const endpoint = `http://localhost:8080/user-portal/users`;

    userService.updateUser(TEST_USER).subscribe(
      (results) => expect(results).toEqual(TEST_USER)
    );

    const mockReq = httpMock.expectOne(endpoint);
    mockReq.flush(TEST_USER);

    expect(mockReq.request.url).toEqual(endpoint);
    expect(mockReq.request.method).toEqual('PUT');
  });

  it('should delete a user', () => {
    const endpoint = `http://localhost:8080/user-portal/users/${TEST_USER.id}`;

    userService.deleteUser(TEST_USER.id).subscribe(
      (results) => expect(results).toEqual(TEST_USER)
    );

    const mockReq = httpMock.expectOne(endpoint);
    mockReq.flush(TEST_USER);

    expect(mockReq.request.url).toEqual(endpoint);
    expect(mockReq.request.method).toEqual('DELETE');
  });
});
