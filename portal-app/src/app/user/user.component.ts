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

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.findAllUsersByFirstName();
  }

  findAllUsers() {
    this.userService.findAllUsers()
      .subscribe(data => {
        
        data.forEach((value: any, key: any) => {
          console.log( key, value);
      });

        this.users = data;
      });
  }

  findAllUsersByFirstName() {
    this.userService.findAllUsersByFirstName()
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