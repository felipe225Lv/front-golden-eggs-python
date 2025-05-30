import { Injectable } from '@angular/core';
import {environment} from '../../../../enviroments/enviroment.prod';
import {HttpClient} from '@angular/common/http';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  color: string;
}

export interface Order{
  idCustomer: number | null;
  cartItem: CartItem[];
  totalPrice: number;
  orderDate: string;
  state: string;
}
@Injectable({
  providedIn: 'root',
})
export class CartService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  saveOrder(order: Order){
    return this.http.post<Order>(`${this.apiUrl}/orders/save`, order);
  }

  getOrdersByUser(id:number | null){
    return this.http.get<Order[]>(`${this.apiUrl}/orders/getOrdersCustomer/${id}`);
  }
}
