import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { StateService } from './core/services/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'qr-root',
  templateUrl: './app.component.html',
  //template:'<p>Hola</p>',
  styleUrls: ['./app.component.css'],
  //styles:['p {color: red;}']
})
export class AppComponent implements OnInit {
  title = 'appGQR';
  expanded = true;
  authSrv = inject(AuthService);
  stateSrv = inject(StateService);
  isLogged = false;
  router = inject(Router);

  toggleExpanded(expanded: boolean) {
    this.expanded = expanded;
  }

  ngOnInit() {
    this.stateSrv.isVisible$.subscribe((value) => {
      this.isLogged = value;
    });

    if (this.authSrv.isLogged()) {
      this.isLogged = true;
      this.stateSrv.hide();
    } else {
      this.router.navigate(['/']);
    }
  }
}
