import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../../../enviroments/enviroment.prod';
import {HttpClient} from '@angular/common/http';

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
export class HumanResourcesService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getEmployee(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/getAllEmployee`);
  }

  saveEmployee(user: User) {
    return this.http.post<User>(`${this.apiUrl}/users/register`, user);
  }

  updateEmployee(user: User, idUser: number){
    return this.http.put<User>(`${this.apiUrl}/users/update/${idUser}`, user);
  }

  disableEmployee(id: number){
    return this.http.patch<void>(`${this.apiUrl}/users/${id}/disable`, {});
  }

  getDisabledEmployee(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/getAllEmployeeDisabled`);
  }
}
