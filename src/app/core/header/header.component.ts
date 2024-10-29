import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'qr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  authSrv = inject(AuthService);
  email: string = '';

  constructor() {
    this.getData();
  }

  getData() {
    this.email = this.authSrv.getUser()?.email || '';
  }
}
