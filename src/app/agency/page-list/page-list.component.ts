import { Component, inject } from '@angular/core';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { AgencyService } from '../services/agency.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  metaDataColumns: MetaDataColumn[] = [
    { field: '_id', title: 'ID' },
    { field: 'name', title: 'AGENCIA' },
    { field: 'address', title: 'DIRECCIÓN' },
  ];

  agencySrv = inject(AgencyService);

  genFormGroup = (data: any) =>
    new FormGroup({
      id: new FormControl(data?._id),
      name: new FormControl(data?.name, Validators.required),
      address: new FormControl(data?.address, Validators.required),
    });
}
