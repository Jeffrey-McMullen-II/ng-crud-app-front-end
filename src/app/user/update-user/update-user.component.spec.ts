import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs/observable/of';

import { UpdateUserComponent } from './update-user.component';
import { TEST_USERS } from '../shared/models/test/users';
import { UserService } from '../shared/services/user.service';

describe('UpdateUserComponent', () => {
  let updateUserComponent: UpdateUserComponent;
  let userService: UserService;
  let fixture: ComponentFixture<UpdateUserComponent>;
  let mockUserService: Partial<UserService>;
  const TEST_USER = TEST_USERS[0];

  beforeEach(async(() => {
    mockUserService = {
      updateUser: () => of(TEST_USER)
    };

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [UpdateUserComponent],
      providers: [
        {provide: UserService, useValue: mockUserService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserComponent);
    updateUserComponent = fixture.componentInstance;
    userService = TestBed.get(UserService);
  });

  it('should update the user', () => {
    spyOn(userService, 'updateUser').and.callThrough();
    updateUserComponent.onUpdateClicked();
    expect(updateUserComponent.user).toEqual(TEST_USER);
    expect(userService.updateUser).toHaveBeenCalledTimes(1);
  });
});
