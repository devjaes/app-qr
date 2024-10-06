import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  metaDataColumns: MetaDataColumn[] = [
    { field: '_id', title: 'ID' },
    { field: 'name', title: 'NOMBRE' },
    { field: 'lastName', title: 'APELLIDO' },
    { field: 'address', title: 'DIRECCIÓN' },
  ];

  clientSrv = inject(ClientService);

  genFormGroup = (data: any) =>
    new FormGroup({
      id: new FormControl(data?._id),
      name: new FormControl(data?.name, Validators.required),
      lastName: new FormControl(data?.lastName, Validators.required),
      address: new FormControl(data?.address, Validators.required),
    });

  constructor() {}
}
