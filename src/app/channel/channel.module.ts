import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChannelRoutingModule } from './channel-routing.module';
import { PageListComponent } from './page-list/page-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PageListComponent],
  imports: [CommonModule, ChannelRoutingModule, SharedModule],
})
export class ChannelModule {}
