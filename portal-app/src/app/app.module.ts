import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {UserComponent} from './user/user.component';
import {AddUserComponent} from './user/add-user/add-user.component';
import {UserService} from './user/shared/services/user.service';
import {RouterModule} from '@angular/router';
import {UpdateUserComponent} from './user/update-user/update-user.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'users', component: UserComponent },
      { path: 'add', component: AddUserComponent },
      { path: 'update', component: UpdateUserComponent }
    ])
  ],
  declarations: [
    AppComponent,
    UserComponent,
    AddUserComponent,
    UpdateUserComponent
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
