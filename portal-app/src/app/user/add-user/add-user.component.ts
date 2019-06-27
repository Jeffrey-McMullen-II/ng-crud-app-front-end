import { Component } from "@angular/core";
import { User } from "../shared/models/user.model";
import { Router } from "@angular/router";
import { UserService } from "../shared/services/user.service";

@Component({
  templateUrl: './add-user.component.html'
})
export class AddUserComponent {

  user: User = new User();

  constructor(private router: Router, private userService: UserService) {

  }

  onCreateClicked(): void {
    this.userService.createUser(this.user)
        .subscribe( data => {
          alert("User created successfully.");
        });
  };
}
