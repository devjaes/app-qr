import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { DownloadComponent } from './download/download.component';
import { KeypadButtonComponent } from './keypad-button/keypad-button.component';
import { TitleComponent } from './title/title.component';
import { CoreModule } from '../core/core.module';
import { TableComponent } from './table/table.component';



@NgModule({
  declarations: [
    ContainerComponent,
    DownloadComponent,
    KeypadButtonComponent,
    TitleComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    CoreModule
  ],
  exports: [
    DownloadComponent,
    ContainerComponent,
    KeypadButtonComponent
  ]
})
export class SharedModule { }
