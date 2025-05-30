import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../../enviroments/enviroment.prod';


export interface Order {
  id: number;
  customerName: string;
  status: 'PENDIENTE' | 'COMPLETADA' | 'CANCELADA';
  total: number;
  date: string;
  items: OrderItem[];
}

export interface OrderItem {
  productName: string;
  quantity: number;
  unitPrice: number;
}


@Injectable({ providedIn: 'root' })
export class OrdersService {
  private baseUrl = environment.apiUrl + '/orders';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/getAll/dto`);
  }

  processOrder(orderId: number, paymentMethod: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/process/${orderId}`, {
      paymentMethod
    });
  }

  cancel(orderId: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/cancel/${orderId}`, ``);
  }

}

