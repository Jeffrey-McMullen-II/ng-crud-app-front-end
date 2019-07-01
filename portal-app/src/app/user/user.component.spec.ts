import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import {TEST_USERS} from './shared/models/test/users';
import { UserService } from './shared/services/user.service';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import { User } from './shared/models/user';

fdescribe('UserComponent', () => {
  let component: UserComponent;
  let userService: UserService;
  let mockUserService: Partial<UserService>;
  let spy: any;
  let fixture: ComponentFixture<UserComponent>;
  let router: Router;
  const TEST_USER = TEST_USERS[0];

  beforeEach(async(() => {
    mockUserService = {
      findAllUsers: () => of(<any>{content: TEST_USERS})
    };

    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      providers: [
        {provide: UserService, useValue: mockUserService},
        {provide: Router, useValue: router}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
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


});
