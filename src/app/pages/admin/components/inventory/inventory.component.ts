import { Component, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe } from "@angular/common";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {InventoryService, Movement} from './service/inventory.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit {
  movements: Movement[] = [];
  displayedColumns: string[] = ['fechaMovimiento', 'huevo', 'peines', 'totalOrden', 'usuario'];
  totalMovements: number = 0;
  totalEggs: number = 0;
  totalCombs: number = 0;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService.getMovements().subscribe(
      (data: Movement[]) => {
        //console.log(data);
        this.movements = data;
        this.calculateSummary(data);
      },
      (error) => {
        console.error('Error al obtener movimientos:', error);
      }
    );
  }

  private calculateSummary(data: Movement[]): void {
    this.totalMovements = data.length;
    this.totalEggs = data.filter(m => m.egg).length;
    this.totalCombs = data.reduce((sum, m) => sum + (m.combs || 0), 0);
  }
}
