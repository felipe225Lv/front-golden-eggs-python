import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {Order, OrdersService} from './services/orders.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogProcessOrderComponent} from './modal-take-order/dialog-process-order.component';


import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  imports: [
    CurrencyPipe,
    DatePipe,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatPaginator,
    MatIcon,
    MatIconButton,
    MatTooltip
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'customerName', 'status', 'total', 'date', 'actions'];
  dataSource = new MatTableDataSource<Order>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ordersService: OrdersService, private dialog: MatDialog) {}

  ngOnInit() {
    this.loadOrders();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadOrders() {
    this.ordersService.getAll().subscribe(data => {
      this.dataSource.data = data.filter(order => order.status === 'PENDIENTE'); // solo pendientes
    });
  }

  cancelOrder(orderId: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción cancelará la orden permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, mantener',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ordersService.cancel(orderId).subscribe({
          next: () => {
            Swal.fire('¡Cancelada!', 'La orden ha sido cancelada correctamente.', 'success');
            this.loadOrders();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo cancelar la orden. Intenta de nuevo.', 'error');
          }
        });
      }
    });
  }

  processOrder(order: Order) {
    const dialogRef = this.dialog.open(DialogProcessOrderComponent, {
      data: order,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { paymentMethod } = result;
        this.ordersService.processOrder(order.id, paymentMethod).subscribe({
          next: () => {
            Swal.fire('¡Éxito!', 'La orden fue procesada correctamente.', 'success');
            this.loadOrders();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo procesar la orden. Intenta de nuevo.', 'error');
          }
        });
      }
    });
  }

}
