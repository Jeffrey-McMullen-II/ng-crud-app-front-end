import { Component, OnInit } from '@angular/core';

import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';

@Component({
  templateUrl: './update-user.component.html'
})
export class UpdateUserComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.user = this.userService.getSharedUser();
  }

  onUpdateClicked() {
    this.userService.updateUser(this.user)
      .subscribe((user: User) => {
        this.user = user;
        alert('User updated successfully.');
      });
  }
}
