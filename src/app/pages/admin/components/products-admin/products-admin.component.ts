import { Component, OnInit } from '@angular/core';
import {DecimalPipe, NgClass, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {Product, ProductAdminService, Supplier, TypeEgg} from './service/product-admin.service';
import Swal from 'sweetalert2';
import {AuthService} from '../../../../core/auth.service';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  imports: [
    FormsModule,
    DecimalPipe,
    NgClass,
    MatIcon,
    MatTableModule,
    NgForOf,
    MatIconButton
  ],
  styleUrl: './products-admin.component.css'
})

export class ProductsAdminComponent implements OnInit{
  products: Product[] = [];
  types: TypeEgg[] = [];
  suppliers: Supplier[] = [];
  product: Product = this.resetProduct();

  selectedTypeId?: number;
  selectedSupplierId?: number;

  allProducts = 0;
  productsInStock = 0;
  mostExpensiveProduct = 0;

  displayColumns = ['nombre', 'color', 'buyPrice', 'salePrice', 'quantity', 'acciones'];

  constructor(private productService: ProductAdminService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    Swal.fire({
      title: 'Cargando datos...',
      html: 'Por favor espera un momento',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    let typesReady = false;
    let suppliersReady = false;

    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      this.calculateSummary();
    });

    this.productService.getAllEggTypes().subscribe(data => {
      this.types = data;
      typesReady = true;
      this.checkDataLoaded(typesReady, suppliersReady);
    });

    this.productService.getAllSuppliers().subscribe(data => {
      this.suppliers = data;
      suppliersReady = true;
      this.checkDataLoaded(typesReady, suppliersReady);
    });
  }

  checkDataLoaded(typesReady: boolean, suppliersReady: boolean) {
    if (typesReady && suppliersReady) {
      Swal.close(); // Cierra el spinner
      }
  }

  calculateSummary() {
    this.allProducts = this.products.length;
    this.productsInStock = this.products.filter(p => p.avibleQuantity > 0).length;
    this.mostExpensiveProduct = this.products.reduce((max, p) => p.salePrice > max ? p.salePrice : max, 0);
  }

  onSubmit(){
    if(!this.selectedTypeId || !this.selectedSupplierId)return;

    const selectedType = this.types.find(t => t.id === Number(this.selectedTypeId));
    const selectedSupplier = this.suppliers.find(s => s.id === Number(this.selectedSupplierId));

    if(selectedType && selectedSupplier){
      this.product.type = selectedType;
      this.product.supplier = selectedSupplier;
      this.save();
    }
  }

  save(): void {
    Swal.fire({
      title: 'Guardando producto...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    const user = this.authService.getUserFromToken();

    if (!user || !user.role) {
      Swal.fire('¡Error!', 'No se pudo obtener la información del usuario', 'error');
      return;
    }

    // Obtenemos el ID del usuario primero
    this.productService.getUserByUsername(user.sub).subscribe({
      next: (userData) => {
        if (!this.product.id) {
          this.productService.saveProduct(this.product, userData.id).subscribe({
            next: () => {
              Swal.fire('¡Éxito!', 'Producto guardado correctamente.', 'success');
              this.loadData();
              this.resetProduct();
            },
            error: (error) => {
              this.handleError(error, 'guardar');
            }
          });
        } else {
          // Actualizar producto existente
          this.productService.update(this.product, userData.id).subscribe({
            next: () => {
              Swal.fire('¡Actualizado!', 'Producto actualizado correctamente.', 'success');
              this.loadData();
              this.resetProduct();
            },
            error: (error) => {
              this.handleError(error, 'actualizar');
            }
          });
        }
      },
      error: (err) => {
        Swal.fire('¡Error!', 'No se pudo obtener el ID del usuario: ' + err.message, 'error');
      }
    });
  }

  private handleError(error: any, action: string): void {
    const mensaje = error?.error?.message || `Ocurrió un error al ${action} el producto.`;
    Swal.fire('¡Error!', mensaje, 'error');
  }

  deleteProduct(id?: number) {
    if (!id) return;

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Esta acción no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe(() => {
          Swal.fire(
            'Eliminado',
            'El producto ha sido eliminado correctamente.',
            'success'
          );
          this.loadData();
        }, error => {
          const errorMessage = error.error?.message || 'Ocurrió un error al eliminar el producto.';
          Swal.fire(
            'Error',
            errorMessage,
            'error'
          );
        });
      }
    });
  }

  editProduct(product: Product){
      this.product = {...product};
      this.selectedSupplierId = product.supplier?.id;
      this.selectedTypeId = product.type?.id;
  }

  resetForm(form?: any) {
    this.selectedTypeId = undefined;
    this.selectedSupplierId = undefined;
    this.resetProduct();
    this.product.id = undefined;
    if (form) form.resetForm();
  }

  private resetProduct(): Product {
    return {
      type:  {
        id: 0, type: ''},
      color: '',
      buyPrice: 0,
      salePrice: 0,
      expirationDate: '', //(yyyy-mm-dd)
      supplier: {
        id: 0,
        name: '',
        address: '',
        typeEggs:[]
      },
      avibleQuantity: 0
    };
  }
}
