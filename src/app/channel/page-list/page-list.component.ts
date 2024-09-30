import { Component, inject } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DownloadComponent } from 'src/app/shared/download/download.component';
import { KeypadButton } from 'src/app/shared/interfaces/keypad.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { environment } from 'src/environments/environment.development';
import { FormComponent } from '../form/form.component';

export interface IChannel {
  _id: number;
  name: string;
}

@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent {
  data: IChannel[] = [
    { _id: 1, name: 'Ambato' },
    { _id: 2, name: 'Riobamba' },
    { _id: 3, name: 'Quito' },
    { _id: 4, name: 'Cuenca' },
    { _id: 5, name: 'Guayaquil' },
    { _id: 6, name: 'Ambato' },
    { _id: 7, name: 'Riobamba' },
    { _id: 8, name: 'Quito' },
    { _id: 9, name: 'Cuenca' },
    { _id: 10, name: 'Guayaquil' },
    { _id: 11, name: 'Ambato' },
    { _id: 12, name: 'Riobamba' },
    { _id: 13, name: 'Quito' },
    { _id: 14, name: 'Cuenca' },
    { _id: 15, name: 'Guayaquil' },
  ]
  metaDataColumns: MetaDataColumn[] = [
    { field: "_id", title: "ID" },
    { field: "name", title: "CANAL" },
  ]
  keypadButtons: KeypadButton[] = [
    { icon: "cloud_download", tooltip: "EXPORTAR", color: "accent", action: "DOWNLOAD" },
    { icon: "add", tooltip: "AGREGAR", color: "primary", action: "NEW" }
  ]
  records: IChannel[] = []
  totalRecords = this.data.length

  bottomSheet = inject(MatBottomSheet)
  dialog = inject(MatDialog)
  snackBar = inject(MatSnackBar)

  constructor() {
    this.loadChannels()
  }

  loadChannels() {
    this.records = this.data
    console.log(this.records)
    this.changePage(0)
  }

  delete(id: number) {
    const position = this.data.findIndex(ind => ind._id === id)
    this.records = this.data.splice(position, 1)
    this.loadChannels()
  }

  openForm(row: any | null = null) {
    const options = {
      panelClass: 'panel-container',
      disableClose: true,
      data: row
    }
    const reference: MatDialogRef<FormComponent> = this.dialog.open(FormComponent, options)

    reference.afterClosed().subscribe((response) => {
      if (!response) { return }
      if (response.id) {
        const channel = { ...response }
        this.loadChannels()
        this.showMessage('Registro actualizado')

      } else {
        const channel = { ...response }
        this.data.push(channel)
        this.loadChannels()
        this.showMessage('Registro exitoso')
      }
    })
  }

  doAction(action: string) {
    switch (action) {
      case 'DOWNLOAD':
        this.showBottomSheet("Lista de Canales", "canales", this.data)
        break
      case 'NEW':
        this.openForm()
        break
    }
  }

  showBottomSheet(title: string, fileName: string, data: any) {
    this.bottomSheet.open(DownloadComponent)
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
