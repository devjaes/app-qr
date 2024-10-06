import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { ClaimUnclaimService } from '../services/qr.service';

@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  metaDataColumns: MetaDataColumn[] = [
    { field: '_id', title: 'ID' },
    { field: 'type', title: 'TIPO' },
    { field: 'description', title: 'DESCRIPCIÓN' },
  ];

  qrSrv = inject(ClaimUnclaimService);

  genFormGroup = (data: any) =>
    new FormGroup({
      id: new FormControl(data?._id),
      type: new FormControl(data?.type, Validators.required),
      description: new FormControl(data?.description, Validators.required),
    });
}
