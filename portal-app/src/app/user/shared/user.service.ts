import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { Component } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

  private sharedUser: User;

  constructor(private http:HttpClient) {}

  private userUrl = 'http://localhost:8080/user-portal/users';

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}`);
  }

  public deleteUser(user): Observable<any> {
    return this.http.delete<User>(`${this.userUrl}` + "/" + `${user.id}`);
  }

  public createUser(user): Observable<User> {
    return this.http.post<User>(`${this.userUrl}`, user);
  }

  public updateUser(user): Observable<User> {
    return this.http.put<User>(`${this.userUrl}`, user);
  }

  public getSharedUser() {
    return this.sharedUser;
  }

  public setSharedUser(sharedUser: User) {
    this.sharedUser = sharedUser;
  }
}