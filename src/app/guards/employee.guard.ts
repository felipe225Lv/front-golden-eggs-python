import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../core/auth.service';


@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getUserFromToken();

    if (user && user.role === 'EMPLOYEE') {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
}
