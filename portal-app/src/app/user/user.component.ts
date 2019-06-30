import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {User} from './shared/models/user';
import {UserService} from './shared/services/user.service';

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
    this.getUsersByFirstName();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(data => {
        this.users = data;
      });
  }

  getUsersByFirstName() {
    this.userService.getUsersByFirstName()
      .subscribe(data => {
        this.users = data;
      });
  }

  onDeleteClicked(user: User) {
    this.userService.deleteUser(user.id)
      .subscribe(data => {
        this.users = this.users.filter(u => u !== user);
      });
  }

  public onUpdateClicked(newUser: User) {
    this.userService.setSharedUser(newUser);
    this.router.navigate(['/update'], {replaceUrl: true});
  }
}