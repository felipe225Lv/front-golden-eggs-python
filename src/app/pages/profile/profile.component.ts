import { Component } from '@angular/core';
import {ProfileService} from './service/profile.service';
import Swal from 'sweetalert2';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {User} from './service/profile.service';
import {AuthService} from '../../core/auth.service';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {animate, style, transition, trigger} from '@angular/animations';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-profile',
  imports: [
    FormsModule,
    NgIf,
    MatInput,
    MatButton,
    MatCardContent,
    MatCardTitle,
    MatCard
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ProfileComponent {
  user: User = this.resetUser();
  passwordData: any = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  constructor(private profileService: ProfileService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const user = this.authService.getUserFromToken();
    this.profileService.getUserByUsername(user.sub).subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error al cargar datos del usuario', error);
      }
    );
  }

  updateProfile(): void {
    this.profileService.updateUser(this.user).subscribe(
      (response) => {
        Swal.fire('¡Éxito!', 'Tus datos se actualizaron correctamente', 'success');
      },
      (error) => {
        Swal.fire('Error', 'No se pudieron actualizar los datos', 'error');
      }
    );
  }

  changePassword() {
    if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
      Swal.fire('Error', 'Las contraseñas no coinciden.', 'error');
      return;
    }

    this.profileService.changePassword(this.user.id, this.passwordData.newPassword)
      .subscribe({
        next: updatedUser => {
          Swal.fire('¡Éxito!', 'Contraseña actualizada correctamente', 'success');
          this.passwordData = { currentPassword: '', newPassword: '', confirmPassword: '' };
        },
        error: err => {
          Swal.fire('Error', 'Error al actualizar la contraseña', 'error');
          console.error(err);
        }
      });
  }

  resetUser() {
    return {
      username: "",
      password: "",
      name: "",
      id: 0,
      phoneNumber: "",
      email: "",
      address: "",
      roleId:2,
      roleName:"EMPLOYE",
      enabled: true
    };
  }
}
