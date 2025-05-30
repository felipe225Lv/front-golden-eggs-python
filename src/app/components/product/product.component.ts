import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService, Product } from './services/product.service';
import { NgForOf } from '@angular/common';
import { AuthService } from '../../core/auth.service';
import { CartItem } from '../../pages/cart/services/cart.service';
import {FormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  imports: [NgForOf, FormsModule, MatIcon],
  styleUrls: ['./product.component.css']
})
export class ProductosComponent implements OnInit {
  @Output() openLogin = new EventEmitter<void>();
  @Input() limit: number | null = null;
  products: Product[] = [];
  private userId: number | null = null;

  constructor(
    private productsService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.getUserFromToken();
    if(user != null) {
      this.authService.getUserData(user.sub).subscribe(data => {
        this.userId = data.id;
      });
    }
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = (this.limit ? data.slice(0, this.limit) : data).map(p=> ({
          ...p,
          cantidad:1
        }));
      },
      error: (err) => console.error("Error al cargar los productos", err)
    });
  }

  agregarProducto(product: Product) {
    if (!this.authService.isLoggedIn()) {
      this.openLogin.emit();
      return;
    }

    if (this.userId === null) {
      console.warn('El userId aún no está disponible, espera unos segundos e intenta de nuevo.');
      return;
    }

    const cantidad = Number(product.cantidad) > 0 ? Number(product.cantidad) : 1;

    const item: CartItem & { color?: string} = {
      id: product.id,
      name: product.type.type,
      price: product.salePrice,
      quantity: cantidad,
      color: product.color,
    };

    const storageKey = `cart_${this.userId}`;
    const savedCart = localStorage.getItem(storageKey);
    let cartItems: (CartItem & { color?: string})[] = savedCart ? JSON.parse(savedCart) : [];

    const existingItem = cartItems.find(p =>
      p.color === item.color &&
      p.name === item.name
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cartItems.push(item);
    }

    localStorage.setItem(storageKey, JSON.stringify(cartItems));

    product.cantidad = 1;
  }


  incrementarCantidad(product: Product) {
    if (!product.cantidad || product.cantidad < 1) {
      product.cantidad = 1;
    } else {
      product.cantidad++;
    }
  }

  decrementarCantidad(product: Product) {
    if (!product.cantidad || product.cantidad <= 1) {
      product.cantidad = 1;
    } else {
      product.cantidad--;
    }
  }

  validarCantidad(product: Product) {
    if (!product.cantidad || product.cantidad < 1) {
      product.cantidad = 1;
    }
  }

}
