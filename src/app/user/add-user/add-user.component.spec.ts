import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs/observable/of';

import { AddUserComponent } from './Add-user.component';
import { TEST_USERS } from '../shared/models/test/users';
import { UserService } from '../shared/services/user.service';


describe('AddUserComponent', () => {
  let addUserComponent: AddUserComponent;
  let userService: UserService;
  let fixture: ComponentFixture<AddUserComponent>;
  let mockUserService: Partial<UserService>;
  const TEST_USER = TEST_USERS[0];

  beforeEach(async(() => {
    mockUserService = {
      createUser: () => of(TEST_USER)
    };

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AddUserComponent],
      providers: [
        {provide: UserService, useValue: mockUserService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    addUserComponent = fixture.componentInstance;
    userService = TestBed.get(UserService);
  });

  it('should create the user', () => {
    spyOn(userService, 'createUser').and.callThrough();
    addUserComponent.onCreateClicked();
    expect(addUserComponent.user).toEqual(TEST_USER);
    expect(userService.createUser).toHaveBeenCalledTimes(1);
  });
});
