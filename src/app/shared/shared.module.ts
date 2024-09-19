import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { DownloadComponent } from './download/download.component';
import { KeypadButtonComponent } from './keypad-button/keypad-button.component';



@NgModule({
  declarations: [
    ContainerComponent,
    DownloadComponent,
    KeypadButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DownloadComponent,
    ContainerComponent,
    KeypadButtonComponent
  ]
})
export class SharedModule { }
