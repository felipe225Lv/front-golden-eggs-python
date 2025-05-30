import { Injectable } from '@angular/core';
import {environment} from '../../../../../../enviroments/enviroment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../../../../core/auth.models';

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
  id?: number;
  type: TypeEgg;
  color: string;
  buyPrice: number;
  salePrice: number;
  expirationDate: string; //(yyyy-mm-dd)
  supplier: Supplier;
  avibleQuantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductAdminService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}/eggs/getAll`);
  }

  saveProduct(product: Product, id: number){
    return this.http.post<Product>(`${this.apiUrl}/eggs/save/${id}`, product);
  }

  getProductById(id: number){
    return this.http.get<Product>(`${this.apiUrl}/eggs/${id}`);
  }

  deleteProduct(id: number){
    return this.http.delete<void>(`${this.apiUrl}/eggs/delete/${id}`);
  }

  getAllEggTypes(): Observable<TypeEgg[]>{
    return this.http.get<TypeEgg[]>(`${this.apiUrl}/egg-types/getAll`);
  }

  getAllSuppliers(): Observable<Supplier[]>{
    return this.http.get<Supplier[]>(`${this.apiUrl}/suppliers/getAll`);
  }
  update(product: Product, idUser: number){
    return this.http.put<Product>(`${this.apiUrl}/eggs/update/${product.id}/${idUser}`, product);
  }

  getUserByUsername(username: string):Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/users/getByUsername/${username}`);
  }
}
