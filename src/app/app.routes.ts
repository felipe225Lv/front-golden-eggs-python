import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import {ProductsComponent} from './pages/products/products.component';
import {AdminGuard} from './guards/admin.guard';
import {UnauthorizedComponent} from './pages/unauthorized/unauthorized.component';
import {SalesComponent} from './pages/admin/components/sales/sales.component';
import {CartComponent} from './pages/cart/cart.component';
import {StatisticsComponent} from './pages/admin/components/statistics/statistics.component';
import {ProductsAdminComponent} from './pages/admin/components/products-admin/products-admin.component';
import {CustomersComponent} from './pages/admin/components/customers/customers.component';
import {HumanResourcesComponent} from './pages/admin/components/human-resources/human-resources.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {RegisterComponent} from './pages/register/register.component';
import {OrdersComponent} from './pages/admin/components/orders/orders.component';
import {InventoryComponent} from './pages/admin/components/inventory/inventory.component';
import {EmployeeComponent} from './pages/employee/employee.component';
import {EmployeeGuard} from './guards/employee.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'employee', component: EmployeeComponent, canActivate: [EmployeeGuard] },
  { path: 'admin/sales', component: SalesComponent, canActivate: [AdminGuard] },
  { path: 'admin/statistics', component: StatisticsComponent, canActivate: [AdminGuard] },
  { path: 'admin/products', component: ProductsAdminComponent, canActivate: [AdminGuard] },
  { path: 'employee/products', component: ProductsAdminComponent, canActivate: [EmployeeGuard] },
  { path: 'admin/customers', component: CustomersComponent, canActivate: [AdminGuard] },
  { path: 'employee/customers', component: CustomersComponent, canActivate: [EmployeeGuard] },
  { path: 'admin/rrhh', component: HumanResourcesComponent, canActivate: [AdminGuard]},
  { path: 'admin/orders', component: OrdersComponent, canActivate: [AdminGuard]},
  { path: 'employee/orders', component: OrdersComponent, canActivate: [EmployeeGuard]},
  { path: 'admin/inventory', component: InventoryComponent, canActivate: [AdminGuard]},
  { path: 'products', component: ProductsComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'register', component: RegisterComponent},
  { path: '**', redirectTo: 'home' } // Siempre debe estar de ultimo
];
