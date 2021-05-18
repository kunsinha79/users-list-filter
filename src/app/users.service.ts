import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Users } from './interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private httpClient: HttpClient) { }

  /**
   * Method to fetch list of users
   * @function getUsers
   * @returns Observable
   */
  getUsers(): Observable<Users[]> {
    return this.httpClient.get<Users[]>(this.userUrl);
  }
}
