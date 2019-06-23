import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "./shared/user.model";
import { UserService } from "./shared/user.service";

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
    this.getUsers();
  };

  getUsers() {
    this.userService.getUsers()
      .subscribe( data => {
        this.users = data;
      });
  }

  onDeleteClicked(user: User): void {
    this.userService.deleteUser(user)
      .subscribe( data => {
        //alert("User deleted successfully.");
        this.users = this.users.filter(u => u !== user);
      })
  };

  public onUpdateClicked(newUser: User) {
    this.userService.setSharedUser(newUser);
    this.router.navigate(['/update'], { replaceUrl: true });
  };
}