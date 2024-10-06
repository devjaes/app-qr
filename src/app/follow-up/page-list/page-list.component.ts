import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { FollowUpService } from '../services/follow-up.service';

@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css'],
})
export class PageListComponent {
  metaDataColumns: MetaDataColumn[] = [
    { field: '_id', title: 'ID' },
    { field: 'reason', title: 'RAZÓN' },
    { field: 'status', title: 'ESTADO' },
  ];

  followUpSrv = inject(FollowUpService);

  genFormGroup = (data: any) =>
    new FormGroup({
      id: new FormControl(data?._id),
      reason: new FormControl(data?.reason, Validators.required),
      status: new FormControl(data?.status, Validators.required),
    });

  constructor() {}
}
