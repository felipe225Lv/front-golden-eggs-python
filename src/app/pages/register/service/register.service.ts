import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../enviroments/enviroment.prod';

export interface User{
  username: string,
  password: string,
  id: number,
  name: string,
  phoneNumber: string,
  email: string,
  address: string,
  roleId: number,
  roleName: string,
  enabled: boolean
}
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  saveCustomer(user: User) {
    return this.http.post<User>(`${this.apiUrl}/users/register`, user);
  }
}
