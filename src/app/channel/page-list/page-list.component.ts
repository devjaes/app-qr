import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { ChannelService } from '../services/channel.service';


@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent {
  metaDataColumns: MetaDataColumn[] = [
    { field: "_id", title: "ID" },
    { field: "name", title: "CANAL" },
  ]

  channelSrv = inject(ChannelService)

  genFormGroup = (data: any) => new FormGroup({
    id: new FormControl(data?._id),
    name: new FormControl(data?.name, Validators.required),
  })


  constructor() { }


}
