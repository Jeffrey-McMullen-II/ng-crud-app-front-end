import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TEST_USERS } from '../models/test/users';
import { UserService } from './user.service';

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
    userService.createUser(TEST_USER).subscribe(
      (results) => expect(results).toEqual(TEST_USER)
    );

    const mockReq = httpMock.expectOne(`${userService.userUrl}`);
    mockReq.flush(TEST_USER);

    expect(mockReq.request.method).toEqual('POST');
  });

  it('should find all users', () => {
    userService.findAllUsers().subscribe(
      (results) => expect(results).toEqual(TEST_USERS)
    );

    const mockReq = httpMock.expectOne(`${userService.userUrl}`);
    mockReq.flush(TEST_USERS);

    expect(mockReq.request.method).toEqual('GET');
  });

  it('should find all users ordered by first name', () => {
    userService.findAllUsersByFirstName().subscribe(
      (results) => expect(results).toEqual(TEST_USERS)
    );

    const mockReq = httpMock.expectOne(`${userService.userUrl}/first-name/ascending`);
    mockReq.flush(TEST_USERS);

    expect(mockReq.request.method).toEqual('GET');
  });

  it('should update a user', () => {
    userService.updateUser(TEST_USER).subscribe(
      (results) => expect(results).toEqual(TEST_USER)
    );

    const mockReq = httpMock.expectOne(`${userService.userUrl}`);
    mockReq.flush(TEST_USER);

    expect(mockReq.request.method).toEqual('PUT');
  });

  it('should delete a user', () => {
    userService.deleteUser(TEST_USER.id).subscribe(
      (results) => expect(results).toEqual(TEST_USER)
    );

    const mockReq = httpMock.expectOne(`${userService.userUrl}/${TEST_USER.id}`);
    mockReq.flush(TEST_USER);

    expect(mockReq.request.method).toEqual('DELETE');
  });
});
