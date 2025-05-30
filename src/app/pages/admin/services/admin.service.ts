import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/enviroment.prod';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registerVisit() {
    return this.http.post(`${this.api}/visit`, {}).subscribe();
  }

  getVisitCount():Observable<number> {
    return this.http.get<{ count: number }>(`${this.api}/visit/count`)
      .pipe(map(res => res.count));
  }

  getTotalIncomeCurrentMonth() {
    return this.http.get<number>(`${this.api}/pay/earnings/total_earnings`);
  }

  getTotalOrdersCurrentMonth() {
    return this.http.get<number>(`${this.api}/order/search/totalOrdersThisMonth`);
  }

  getTotalEggsInStock() {
    return this.http.get<number>(`${this.api}/egg/search/count_this_month`);
  }

  getTotalClients() {
    return this.http.get<number>(`${this.api}/user/byrol/3`);
  }

  getTotalEmployees() {
    return this.http.get<number>(`${this.api}/users/count/employees`);
  }

  getTotalExpensesCurrentMonth(){
    return this.http.get<number>(`${this.api}/payments/totalExpensesCurrentMonth`)
  }
}
