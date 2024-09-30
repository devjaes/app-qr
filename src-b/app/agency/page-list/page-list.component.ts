import { Component } from '@angular/core';
import { DownloadComponent } from 'src/app/shared/download/download.component';
import { MetaDataColumn } from 'src/app/shared/interfaces/matacolumn.interface';

export interface IAgency {
  _id: number;
  name: string;
  address: string;
}

@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent {
  data: IAgency[] = [
    { _id: 1, name: 'Ambato', address: 'Calle A' },
    { _id: 2, name: 'Riobamba', address: 'Calle B' },
    { _id: 3, name: 'Quito', address: 'Calle C' },
    { _id: 4, name: 'Cuenca', address: 'Calle D' },
    { _id: 5, name: 'Guayaquil', address: 'Calle E' },
    { _id: 6, name: 'Ambato', address: 'Calle A' },
    { _id: 7, name: 'Riobamba', address: 'Calle B' },
    { _id: 8, name: 'Quito', address: 'Calle C' },
    { _id: 9, name: 'Cuenca', address: 'Calle D' },
    { _id: 10, name: 'Guayaquil', address: 'Calle E' },
    { _id: 11, name: 'Ambato', address: 'Calle A' },
    { _id: 12, name: 'Riobamba', address: 'Calle B' },
    { _id: 13, name: 'Quito', address: 'Calle C' },
    { _id: 14, name: 'Cuenca', address: 'Calle D' },
    { _id: 15, name: 'Guayaquil', address: 'Calle E' },
  ];

  metaDataColumns: MetaDataColumn[] = [
    { field: '_id', title: 'ID' },
    { field: 'name', title: 'AGENCIA' },
    { field: 'address', title: 'DIRECCIÓN' }
  ];

  keypayButtons: KeyPayButton[] = [
    { icon: "cloud_download", tooltip: "EXPORTAR", color: "accent", action: "DOWNLOAD" },
    { icon: "add", tooltip: "AGREGAR", color: "primary", action: "ADD" },
    { icon: "delete", tooltip: "ELIMINAR", color: "warn", action: "DELETE" }
  ];

  records: IAgency[] = [];
  totalRecords = this.data.length;

  bottomSheet = inject(MatBottomSheet);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);

  constructor() {
    this.loadAgencies()
  }

  loadAgencies() {
    this.records = this.data
    console.log(this.records)
    this.changePage(0)
  }

  delete(id: nu mber) {
    const position = this.data.findIndex(agency => agency._id === id);
    this.records = this.data.splice(position, 1);
    this.loadAgencies();
  }

  openForm(row: any | null = null) { }
  const options = {
    panelClass: 'panel-container',


  }

  showBottomSheet(title: string, fileName: string, data: any) {
    this.bottomSheet.open(DownloadComponent);
  }

  showMessage(message: string, duration: number = 5000) {
    this.snackBar.open(message, '', { duration })
  }

  changePage(page: number) {
    const pageSize = environment.PAGE_SIZE
    const skip = pageSize * page
    this.data = this.records.slice(skip, skip + pageSize)
  }
}
