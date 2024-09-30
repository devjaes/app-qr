import { Injectable } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

interface IIcon {
  name: string;
  path: string;
}

@Injectable({
  providedIn: 'root'
})
export class IconService {
  private listIcon: IIcon[] = [
    { name: 'agency', path: 'assets/icons/agency.svg' },
    { name: 'client', path: 'assets/icons/client.svg' },
    { name: 'channel', path: 'assets/icons/channel.svg' },
    { name: 'employee', path: 'assets/icons/employee.svg' },
    { name: 'qr', path: 'assets/icons/qr.svg' },
    { name: 'follow-up', path: 'assets/icons/follow-up.svg' },
    { name: 'logout', path: 'assets/icons/logo.svg' },
  ]

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.registerIcons();
  }

  private registerIcons() {
    this.listIcon.forEach(icon => {
      this.matIconRegistry.addSvgIcon(
        icon.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path)
      );
    });
  }


}
