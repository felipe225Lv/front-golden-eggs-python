import { Injectable } from '@angular/core';
import {environment} from '../../../../../../enviroments/enviroment.prod';
import {HttpClient} from '@angular/common/http';

export interface Movement {
  id: number;
  movementDate: string;
  combs: number;
  egg: number;
  order?: number;
  user: {
    id: number;
    name: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getMovements(){
    return this.http.get<Movement[]>(`${this.apiUrl}/inventories/getAll`);
  }
}
