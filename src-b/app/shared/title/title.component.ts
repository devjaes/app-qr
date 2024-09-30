import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMenu, MenuService } from 'src/app/services/core/menu/menu.service';

@Component({
  selector: 'qr-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent {
  path: IMenu
  menuSrv = inject(MenuService);
  activatedRoute = inject(ActivatedRoute);

  constructor() {
    const currentPath = '/' + this.activatedRoute.snapshot.pathFromRoot[1].routeConfig?.path;
    console.log(currentPath);
    this.path = this.menuSrv.getMenuByURL(currentPath);
    console.log(this.path);
  }
}
