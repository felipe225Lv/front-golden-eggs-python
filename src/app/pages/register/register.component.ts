import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {RegisterService, User} from './service/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
    imports: [
        FormsModule
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User = this.resetUser();

  constructor(private registerService: RegisterService) {}

  onSubmit() {
    this.createUser();
  }
  createUser() {
    Swal.fire({
      title: 'Guardando perfil...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    this.registerService.saveCustomer(this.user).subscribe({
      next: () => {
        Swal.fire('¡Éxito!', 'Cuenta creada correctamente.', 'success');
        this.resetForm();
      },
      error: (error) => this.handleError(error, 'crear')
    });
  }

  private handleError(error: any, action: string): void {
    const mensaje = error?.error?.message || `Ocurrió un error al ${action} el perfil.`;
    Swal.fire('¡Error!', mensaje, 'error');
  }

  resetForm(form?: any) {
    this.user = this.resetUser();
    if (form) form.resetForm();
  }

  resetUser() {
    return {
      username: "",
      password: "",
      id: 0,
      name: "",
      phoneNumber: "",
      email: "",
      address: "",
      roleId:3,
      roleName:"CUSTOMER",
      enabled: true
    };
  }
}
