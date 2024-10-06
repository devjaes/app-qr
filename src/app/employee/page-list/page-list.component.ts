import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { EmployeeService } from '../services/employee.service';

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
    { field: 'position', title: 'CARGO' },
  ];

  employeeSrv = inject(EmployeeService);

  genFormGroup = (data: any) =>
    new FormGroup({
      id: new FormControl(data?._id),
      name: new FormControl(data?.name, Validators.required),
      lastName: new FormControl(data?.lastName, Validators.required),
      position: new FormControl(data?.position, Validators.required),
    });

  constructor() {}
}
