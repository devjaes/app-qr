import { Component, inject } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DownloadComponent } from 'src/app/shared/download/download.component';
import { KeypadButton } from 'src/app/shared/interfaces/keypad.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { environment } from 'src/environments/environment.development';
import { FormComponent } from '../form/form.component';

export interface IClaimUnclaim {
  _id: number
  type: string
  description: string
}
@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent {

  data: IClaimUnclaim[] = [
    { _id: 1, type: "Reclamo", description: "Reclamo por producto defectuoso" },
    { _id: 2, type: "Reclamo", description: "Reclamo por producto defectuoso" },
    { _id: 3, type: "Reclamo", description: "Reclamo por producto defectuoso" },
    { _id: 4, type: "Queja", description: "Queja por producto defectuoso" },
  ]
  metaDataColumns: MetaDataColumn[] = [
    { field: "_id", title: "ID" },
    { field: "type", title: "TIPO" },
    { field: "description", title: "DESCRIPCIÓN" },
  ]
  keypadButtons: KeypadButton[] = [
    { icon: "cloud_download", tooltip: "EXPORTAR", color: "accent", action: "DOWNLOAD" },
    { icon: "add", tooltip: "AGREGAR", color: "primary", action: "NEW" }
  ]
  records: IClaimUnclaim[] = []
  totalRecords = this.data.length

  bottomSheet = inject(MatBottomSheet)
  dialog = inject(MatDialog)
  snackBar = inject(MatSnackBar)

  constructor() {
    this.loadUnclaims()
  }

  loadUnclaims() {
    this.records = this.data
    console.log(this.records)
    this.changePage(0)
  }

  delete(id: number) {
    const position = this.data.findIndex(ind => ind._id === id)
    this.records = this.data.splice(position, 1)
    this.loadUnclaims()
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
        const unclaim = { ...response }
        this.loadUnclaims()
        this.showMessage('Registro actualizado')

      } else {
        const unclaim = { ...response }
        this.data.push(unclaim)
        this.loadUnclaims()
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
