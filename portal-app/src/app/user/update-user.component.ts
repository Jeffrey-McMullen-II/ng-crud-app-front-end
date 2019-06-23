import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { User } from '../models/user.model';
import { UserService } from './user.service';

@Component({
  templateUrl: './update-user.component.html'
})
export class UpdateUserComponent {

  private route: ActivatedRoute;
  user: User;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
      this.user = this.userService.getSharedUser();
  }

  onUpdateClicked(): void {
    this.userService.updateUser(this.user)
        .subscribe(data => {
          alert("User updated successfully.");
          });
  };
}
