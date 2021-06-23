import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './shared/models/user';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  users: User[];

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.findAllUsersByFirstName();
  }

  findAllUsers() {
    this.userService.findAllUsers()
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  findAllUsersByFirstName() {
    this.userService.findAllUsersByFirstName()
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  public onUpdateClicked(user: User) {
    this.userService.setSharedUser(user);
    this.router.navigate(['/update'], {replaceUrl: true});
  }

  onDeleteClicked(user: User) {
    this.userService.deleteUser(user.userId)
      .subscribe((result) => {
        this.users = this.users.filter(u => u !== user);
      });
  }
}
