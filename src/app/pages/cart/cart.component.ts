import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartItem, CartService, Order} from './services/cart.service';
import { AuthService } from '../../core/auth.service';
import Swal from 'sweetalert2';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {ModalViewOrderComponent} from './modal-view-order/modal-view-order.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable, MatHeaderCellDef, MatIcon, MatIconButton, MatTooltip],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: CartItem[] = [];
  private userId: number | null = null;
  order: Order = this.resetOrder();
  displayedColumns: string[] = ['date', 'customerName', 'status', 'total', 'actions'];
  dataSource = new MatTableDataSource<Order>();

  constructor(public auth: AuthService, private cartService: CartService, private dialog: MatDialog) {
    try {
      const user = this.auth.getUserFromToken();
      this.auth.getUserData(user.sub).subscribe(data => {
        this.userId = data.id;

        const storageKey = this.getStorageKey();
        const savedCart = storageKey ? localStorage.getItem(storageKey) : null;

        if (savedCart) {
          this.cartItems = JSON.parse(savedCart);
        }
        this.loadOrders();
      });
    } catch (error) {
      console.error('Error initializing cart', error);
      this.userId = null;
    }
  }

  loadOrders() {
    this.cartService.getOrdersByUser(this.userId).subscribe(data => {
      this.dataSource.data = data;

    });
  }

  save(){
    const storageKey = this.getStorageKey();
    const savedCart = storageKey ? localStorage.getItem(storageKey) : null;

    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.order = this.resetOrder();
      //console.log(this.order);
      this.cartService.saveOrder(this.order).subscribe({
        next: () => {
          this.clearCart();
          Swal.fire('¡Éxito!', 'Orden generada correctamente.', 'success');
        },
        error: (error) => {
          this.handleError(error, 'guardar');
        }
      });
    }
  }

  private handleError(error: any, action: string): void {
    const mensaje = error?.error?.message || `Ocurrió un error al ${action} la orden.`;
    Swal.fire('¡Error!', mensaje, 'error');
  }

  private getStorageKey(): string | null {
    return this.userId !== null ? `cart_${this.userId}` : 'cart_guest';
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
    this.saveCart();
  }

  private saveCart(): void {
    const storageKey = this.getStorageKey();
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(this.cartItems));
    }
  }

  mostrarOrden(order: Order) {
    const dialogRef = this.dialog.open(ModalViewOrderComponent, {
      data: order,
      width: '500px'
    });
  }
  private clearCart(): void {
    const storageKey = this.getStorageKey();

    // Limpiar en memoria
    this.cartItems = [];

    // Limpiar localStorage
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }

    // Resetear orden
    this.order = this.resetOrder();
  }

  resetOrder() {
    return {
      idCustomer: this.userId,
      cartItem: this.cartItems,
      totalPrice: this.cartItems.reduce(
        (total, item) => total + (Number(item.price) * Number(item.quantity)),
        0
      ),
      orderDate: new Date().toISOString(), // o cualquier formato que uses
      state: "PENDIENTE"
    };
  }

  getStatusClass(status: string): string {
    switch (status.toUpperCase()) {
      case 'COMPLETADA':
        return 'status-completada';
      case 'INVENTORY':
        return 'status-inventory';
      case 'PENDIENTE':
        return 'status-pendiente';
      case 'CANCELADA':
        return 'status-cancelada';
      default:
        return '';
    }
  }

}
