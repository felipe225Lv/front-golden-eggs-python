import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {Order} from '../services/cart.service';
import {CurrencyPipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from '@angular/material/table';

@Component({
  selector: 'app-modal-view-order',
  imports: [
    CurrencyPipe,
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef
  ],
  templateUrl: './modal-view-order.component.html',
  styleUrl: './modal-view-order.component.css'
})
export class ModalViewOrderComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public order: Order,
    private dialogRef: MatDialogRef<ModalViewOrderComponent>
  ) {}

  cancel() {
    this.dialogRef.close(null);
  }
}

