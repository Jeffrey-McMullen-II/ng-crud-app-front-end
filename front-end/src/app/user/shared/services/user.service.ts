import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {User} from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  private sharedUser: User;

  constructor(private http: HttpClient) {
  }

  private userUrl = `http://localhost:8080/crud-app/users`;

  public createUser(user): Observable<User> {
    return this.http.post<User>(`${this.userUrl}`, JSON.stringify(user), {headers: httpOptions.headers});
  }

  public findAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}`);
  }

  public findAllUsersByFirstName(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}/asc`);
  }

  public updateUser(user): Observable<User> {
    return this.http.put<User>(`${this.userUrl}`, JSON.stringify(user), {headers: httpOptions.headers});
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
