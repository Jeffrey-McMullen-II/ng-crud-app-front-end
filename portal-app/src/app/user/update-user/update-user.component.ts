import {Component, OnInit} from '@angular/core';
import {User} from '../shared/models/user';
import {UserService} from '../shared/services/user.service';
import {Router} from '@angular/router';


@Component({
  templateUrl: './update-user.component.html'
})
export class UpdateUserComponent implements OnInit {

  user: User;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.user = this.userService.getSharedUser();
  }

  onUpdateClicked(): void {
    this.userService.updateUser(this.user)
      .subscribe(data => {
        alert('User updated successfully.');
      });
  };
}
