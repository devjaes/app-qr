import { Component } from '@angular/core';

@Component({
  selector: 'qr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  listMenu: Menu[] = [];
  expanded: boolean = true;
}

type Menu = {
  url: string;
};
