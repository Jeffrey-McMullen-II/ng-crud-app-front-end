import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import {TEST_USERS} from './shared/models/test/users';
import { UserService } from './shared/services/user.service';
import {of} from 'rxjs';

fdescribe('UserComponent', () => {
  let component: UserComponent;
  let userService: UserService;
  let mockUserService: Partial<UserService>;
  let spy: any;
  let fixture: ComponentFixture<UserComponent>;
  const TEST_USER = TEST_USERS[0];

  beforeEach(async(() => {
    mockUserService = {
      findAllUsers: () => of(<any>{content: TEST_USERS})
    };

    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      providers: [{provide: UserService, useValue: mockUserService}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(userService);
    fixture.detectChanges();
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
    component.users = TEST_USERS;
    expect(component.findAllUsers).toEqual(TEST_USERS);
    expect(userService.findAllUsers).toHaveBeenCalled();
  });


});
