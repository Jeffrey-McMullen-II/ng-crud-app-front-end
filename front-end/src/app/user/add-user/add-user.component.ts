import { Component } from '@angular/core';

import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';

@Component({
  templateUrl: './add-user.component.html'
})
export class AddUserComponent {

  user: User = new User();

  constructor(private userService: UserService) {
  }

  onCreateClicked() {
    this.userService.createUser(this.user)
      .subscribe(data => {
        this.user = data;
        alert('User created successfully.');
      });
  }
}
