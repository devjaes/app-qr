import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { PageListComponent } from './page-list/page-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PageListComponent],
  imports: [CommonModule, ClientRoutingModule, SharedModule],
})
export class ClientModule {}
