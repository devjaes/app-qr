import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyRoutingModule } from './agency-routing.module';
import { PageListComponent } from './page-list/page-list.component';
import { FormComponent } from './form/form.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    PageListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    AgencyRoutingModule
  ]
})
export class AgencyModule { }
