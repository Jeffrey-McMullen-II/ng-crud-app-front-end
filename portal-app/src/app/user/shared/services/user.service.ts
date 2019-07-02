import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {User} from '../models/user';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserService {

  private sharedUser: User;

  constructor(private http: HttpClient) {
  }

  private userUrl = `http://localhost:8080/user-portal/users`;

  public createUser(user): Observable<User> {
    return this.http.post<User>(`${this.userUrl}`, user);
  }

  public findAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}`);
  }

  public findAllUsersByFirstName(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}/asc`);
  }

  public updateUser(user): Observable<User> {
    return this.http.put<User>(`${this.userUrl}`, user);
  }

  public deleteUser(id: Number): Observable<User> {
    return this.http.delete<User>(`${this.userUrl}/${id}`);
  }

  public getSharedUser() {
    return this.sharedUser;
  }

  public setSharedUser(sharedUser: User) {
    this.sharedUser = sharedUser;
  }
}
