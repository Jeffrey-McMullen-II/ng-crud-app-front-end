import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {UserComponent} from './user.component';
import {TEST_USERS} from './shared/models/test/users';
import {UserService} from './shared/services/user.service';
import {of} from 'rxjs/observable/of';
import {Router} from '@angular/router';
import {User} from './shared/models/user';
import {RouterTestingModule} from '@angular/router/testing';

describe('UserComponent', () => {
  let component: UserComponent;
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
      deleteUser: () => of(MOCK_TEST_USERS),
      setSharedUser(sharedUser: User) { this.sharedUser = sharedUser; },
      getSharedUser(): User { return this.sharedUser; }
    };

    TestBed.configureTestingModule({
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
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);

    TEST_USER = TEST_USERS[0];
    MOCK_TEST_USERS = TEST_USERS;
    component.users = TEST_USERS;
  });

  afterEach(() => {
    userService = null;
    component = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find all users', () => {
    spyOn(userService, 'findAllUsers').and.callThrough();
    component.findAllUsers();
    expect(component.users).toEqual(TEST_USERS);
    expect(userService.findAllUsers).toHaveBeenCalled();
  });

  it('should find all users by first name', () => {
    spyOn(userService, 'findAllUsersByFirstName').and.callThrough();
    component.findAllUsersByFirstName();
    expect(component.users).toEqual(TEST_USERS);
    expect(userService.findAllUsersByFirstName).toHaveBeenCalled();
  });

  it('should set shared user and navigate when on updated clicked', () => {
    component.onUpdateClicked(TEST_USER);
    expect(userService.getSharedUser()).toEqual(TEST_USER);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/update'], {replaceUrl: true});
  });

  it('should delete a user on delete clicked', () => {
    spyOn(userService, 'deleteUser').and.callThrough();
    component.onDeleteClicked(TEST_USER);
    MOCK_TEST_USERS = MOCK_TEST_USERS.filter(u => u !== TEST_USER);
    expect(component.users).toEqual(MOCK_TEST_USERS);
  });
});
