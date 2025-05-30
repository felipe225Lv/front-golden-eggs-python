import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {Order} from '../services/orders.service';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/input';
import {CurrencyPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';


import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';

@Component({
  selector: 'app-dialog-change-status',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatLabel,
    MatDialogActions,
    MatButton,
    FormsModule,
    CurrencyPipe,
    MatTable,
    MatColumnDef,
    MatCellDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatSelect,
    MatOption,
  ],
  templateUrl: './dialog-process-order.component.html',
  styleUrl: './dialog-process-order.component.css'
})


export class DialogProcessOrderComponent {
  paymentMethod = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public order: Order,
    private dialogRef: MatDialogRef<DialogProcessOrderComponent>
  ) {}

  save() {
    if (this.paymentMethod) {
      this.dialogRef.close({
        paymentMethod: this.paymentMethod
      });
    }
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
