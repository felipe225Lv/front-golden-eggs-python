import { Injectable } from '@angular/core';
import {environment} from '../../../../enviroments/enviroment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface User{
  username: string,
  password: string,
  name: string,
  id: number,
  phoneNumber: string,
  email: string,
  address: string,
  roleId: number,
  roleName: string,
}
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
//getCurrentUser  -  updateUser  -   changePassword
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getUserByUsername(username: string):Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/users/getByUsername/${username}`);
  }

  updateUser(user: User) {
    return this.http.put<User>(`${this.apiUrl}/users/update/${user.id}`, user);
  }

  changePassword(id: number, password: string) {
    return this.http.patch<User>(`${this.apiUrl}/users/updatepass/password/${id}`, {
      newPassword: password
    });
  }
}
