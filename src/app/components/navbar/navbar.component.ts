import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  styleUrls: ['./navbar.component.css'],
  standalone: true
})
export class NavbarComponent implements OnInit {
  showAdmin = false;
  showEmployee = false;
  private adminSubscription!: Subscription;
  private employeeSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private cdr1: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Suscribirse a los cambios de rol en tiempo real
    this.adminSubscription = this.authService.isAdmin$.subscribe((isAdmin: boolean) => {
      this.showAdmin = isAdmin;
      this.cdr.detectChanges(); // Forzar la actualización del DOM
    });

    this.employeeSubscription = this.authService.isEmployee$.subscribe((isEmployee: boolean) => {
      this.showEmployee = isEmployee;
      this.cdr1.detectChanges(); // Forzar la actualización del DOM
    });

    // También verificar al inicio por si ya hay sesión activa
    const userRole = this.authService.getUserRoleFromToken();
    this.showAdmin = userRole === 'ADMIN';
    this.showEmployee = userRole === 'EMPLOYEE';
  }

  ngOnDestroy(): void {
    if (this.adminSubscription) {
      this.adminSubscription.unsubscribe();
    }
    if (this.employeeSubscription) {
      this.employeeSubscription.unsubscribe();
    }
  }

  @Output() openLogin = new EventEmitter<void>();

  abrirLogin() {
    this.openLogin.emit();
  }

  openLoginCart(){
    if(!this.authService.isLoggedIn()){
      this.openLogin.emit();
    }else{
      this.router.navigate(['/cart']);
    }
  }
}
