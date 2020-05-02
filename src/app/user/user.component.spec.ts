import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { UserComponent } from './user.component';
import { TEST_USERS } from './shared/models/test/users';
import { User } from './shared/models/user';
import { UserService } from './shared/services/user.service';

describe('UserComponent', () => {
  let userComponent: UserComponent;
  let userService: UserService;
  let mockUserService: Partial<UserService>;
  let fixture: ComponentFixture<UserComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  let TEST_USER: User;
  let MOCK_TEST_USERS: User[];

  beforeEach(async(() => {
    mockUserService = {
      findAllUsers: () => of(TEST_USERS),
      findAllUsersByFirstName: () => of(TEST_USERS),
      deleteUser: () => of(TEST_USER),
      setSharedUser(sharedUser: User) { this.sharedUser = sharedUser; },
      getSharedUser(): User { return this.sharedUser; }
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [UserComponent],
      providers: [
        {provide: UserService, useValue: mockUserService},
        {provide: Router, useValue: mockRouter}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    userComponent = fixture.componentInstance;
    userService = TestBed.get(UserService);

    TEST_USER = TEST_USERS[0];
    MOCK_TEST_USERS = TEST_USERS;
    userComponent.users = TEST_USERS;
  });

  afterEach(() => {
    userService = null;
    userComponent = null;
  });

  it('should find all users', () => {
    spyOn(userService, 'findAllUsers').and.callThrough();
    userComponent.findAllUsers();
    expect(userComponent.users).toEqual(TEST_USERS);
    expect(userService.findAllUsers).toHaveBeenCalledTimes(1);
  });

  it('should find all users by first name', () => {
    spyOn(userService, 'findAllUsersByFirstName').and.callThrough();
    userComponent.findAllUsersByFirstName();
    expect(userComponent.users).toEqual(TEST_USERS);
    expect(userService.findAllUsersByFirstName).toHaveBeenCalledTimes(1);
  });

  it('should set shared user and navigate when on updated clicked', () => {
    userComponent.onUpdateClicked(TEST_USER);
    expect(userService.getSharedUser()).toEqual(TEST_USER);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/update'], {replaceUrl: true});
  });

  it('should delete a user on delete clicked', () => {
    spyOn(userService, 'deleteUser').and.callThrough();
    userComponent.onDeleteClicked(TEST_USER);
    MOCK_TEST_USERS = MOCK_TEST_USERS.filter(u => u !== TEST_USER);
    expect(userComponent.users).toEqual(MOCK_TEST_USERS);
  });
});
