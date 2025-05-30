import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatIconButton} from '@angular/material/button';
import Swal from 'sweetalert2';
import {MatIcon} from '@angular/material/icon';
import {User, HumanResourcesService} from './service/human-resources.service';
import {AuthService} from '../../../../core/auth.service';
import {NgIf} from '@angular/common';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';

@Component({
  selector: 'app-human-resources',
  standalone: true,
  imports: [
    FormsModule,
    MatTableModule,
    MatIcon,
    MatIconButton,
    NgIf,
    MatButtonToggleGroup,
    MatButtonToggle
  ],
  templateUrl: './human-resources.component.html',
  styleUrl: './human-resources.component.css'
})
export class HumanResourcesComponent {
  users: User[] = [];
  user: User = this.resetUser();
  displayColumns = ['name', 'username', 'email', 'phoneNumber', 'address', 'acciones'];
  isEditing = false;
  showDisabled = false;


  allUsers = 0;
  constructor(private humanResourcesService: HumanResourcesService, private authService: AuthService) {
  }

  onToggleChange() {
    if (this.showDisabled) {
      this.loadDataDisabled();
    } else {
      this.loadData();
    }
  }

  ngOnInit() {
    this.loadData();
  }

  calculateSummary() {
    this.allUsers = this.users.length;
  }

  onSubmit() {
    if (this.isEditing) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  createUser() {
    Swal.fire({
      title: 'Guardando empleado...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    this.humanResourcesService.saveEmployee(this.user).subscribe({
      next: () => {
        Swal.fire('¡Éxito!', 'Empleado creado correctamente.', 'success');
        this.loadData();
        this.resetForm();
      },
      error: (error) => this.handleError(error, 'crear')
    });
  }

  updateUser() {
    Swal.fire({
      title: 'Actualizando empleado...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });
    this.humanResourcesService.updateEmployee(this.user, this.user.id).subscribe({
      next: () => {
        Swal.fire('¡Actualizado!', 'Empleado actualizado correctamente.', 'success');
        this.loadData();
        this.resetForm();
      },
      error: (error) => this.handleError(error, 'actualizar')
    });
  }

  private handleError(error: any, action: string): void {
    const mensaje = error?.error?.message || `Ocurrió un error al ${action} el producto.`;
    Swal.fire('¡Error!', mensaje, 'error');
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

    this.humanResourcesService.getEmployee().subscribe({
      next: (data) => {
        this.users = data;
        this.calculateSummary();
        Swal.close();
      },
      error: (error) => {
        Swal.close()
      }
    });
  }

  loadDataDisabled() {
    Swal.fire({
      title: 'Cargando empleados inactivos...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });
    this.humanResourcesService.getDisabledEmployee().subscribe({
      next: (data) => {
        //console.log(data);
        this.users = data;
        this.calculateSummary();
        Swal.close();
      },
      error: () => Swal.close()
    });
  }

  editUser(user: User) {
    this.user = { ...user, password: "" };
    this.isEditing = true;
  }

  deleteUser(idUser: number) {
    if (!idUser) return;
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Esta acción no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, deshabilitar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.humanResourcesService.disableEmployee(idUser).subscribe(() => {
          Swal.fire(
            'Deshabilitado',
            'El Usuario ha sido deshabilitado correctamente.',
            'success'
          );
          this.loadData();
        }, error => {
          const errorMessage = error.error?.message || 'Ocurrió un error al deshabilitar el producto.';
          Swal.fire(
            'Error',
            errorMessage,
            'error'
          );
        });
      }
    });
  }

  resetForm(form?: any) {
    this.user = this.resetUser();
    this.isEditing = false;
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
      roleId:2,
      roleName:"EMPLOYE",
      enabled: true
    };
  }
}
