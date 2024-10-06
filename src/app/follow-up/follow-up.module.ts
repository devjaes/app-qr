import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowUpRoutingModule } from './follow-up-routing.module';
import { PageListComponent } from './page-list/page-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PageListComponent],
  imports: [CommonModule, FollowUpRoutingModule, SharedModule],
})
export class FollowUpModule {}
