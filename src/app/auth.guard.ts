import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private authSrv = inject(AuthService);
  private router = inject(Router);

  canActivate() {
    if (!this.authSrv.isLogged()) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
