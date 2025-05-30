import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {Router} from '@angular/router';

@Component({
  selector: 'app-employee',
    imports: [
        NgForOf
    ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

  constructor(private router: Router) {}

  areas = [
    { nombre: 'Productos', ruta: '/employee/products', icon: '🛍️' },
    { nombre: 'Clientes', ruta: '/employee/customers', icon: '👥' },
    { nombre: 'Ordenes', ruta: '/employee/orders', icon: '📦' },
  ];

  irARuta(ruta: string): void {
    this.router.navigate([ruta]);
  }

}
