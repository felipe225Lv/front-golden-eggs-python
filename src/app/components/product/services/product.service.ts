import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from '../../../../enviroments/enviroment.prod';

export interface TypeEgg{
  id: number;
  type: string;
}

export interface Supplier{
  id: number;
  name: string;
  address: string;
  typeEggs: TypeEgg[];
}

export interface Product {
  id: number;
  type: TypeEgg;
  color: string;
  buyPrice: number;
  salePrice: number;
  expirationDate: string; //(yyyy-mm-dd)
  supplier: Supplier;
  avibleQuantity: number;
  cantidad: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/eggs/getAllEggDto`);
  }
}
