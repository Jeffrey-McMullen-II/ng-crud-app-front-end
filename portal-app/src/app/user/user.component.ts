import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { User } from '../models/user.model';
import { UserService } from './user.service';

@Component({
selector: 'app-user',
templateUrl: './user.component.html',
styles: []
})
export class UserComponent implements OnInit {

users: User[];

constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe( data => {
        this.users = data;
      });
  };

  deleteUser(user: User): void {
    this.userService.deleteUser(user)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      })
  };

  public setSharedUser(newUser: User) {
    this.userService.setSharedUser(newUser);
    this.router.navigate(['/update'], { replaceUrl: true });
  };

}
