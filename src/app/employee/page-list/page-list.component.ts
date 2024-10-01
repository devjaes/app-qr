import { Component, inject } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DownloadComponent } from 'src/app/shared/download/download.component';
import { KeypadButton } from 'src/app/shared/interfaces/keypad.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { environment } from 'src/environments/environment.development';
import { FormComponent } from '../form/form.component';

export interface IEmployee {
  _id: number;
  name: string;
  lastName: string;
  position: string;
}
@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent {
  data: IEmployee[] = [
    { _id: 1, name: 'Juan', lastName: 'Perez', position: 'Gerente' },
    { _id: 2, name: 'Maria', lastName: 'Gonzalez', position: 'Gerente' },
    { _id: 3, name: 'Carlos', lastName: 'Velez', position: 'Asistente' },
  ]
  metaDataColumns: MetaDataColumn[] = [
    { field: "_id", title: "ID" },
    { field: "name", title: "NOMBRE" },
    { field: "lastName", title: "APELLIDO" },
    { field: "position", title: "CARGO" },
  ]
  keypadButtons: KeypadButton[] = [
    { icon: "cloud_download", tooltip: "EXPORTAR", color: "accent", action: "DOWNLOAD" },
    { icon: "add", tooltip: "AGREGAR", color: "primary", action: "NEW" }
  ]
  records: IEmployee[] = []
  currentPage = 0
  totalRecords = this.data.length

  bottomSheet = inject(MatBottomSheet)
  dialog = inject(MatDialog)
  snackBar = inject(MatSnackBar)

  constructor() {
    this.loadEmployees()
  }

  loadEmployees() {
    this.records = this.data
    console.log(this.records)
    this.changePage(this.currentPage)
  }

  delete(id: number) {
    const position = this.data.findIndex(ind => ind._id === id)
    this.records = this.data.splice(position, 1)
    this.loadEmployees()
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
        const channel = { ...response, _id: response.id }
        const position = this.data.findIndex(ind => ind._id === response.id)

        this.data[position] = channel
        this.loadEmployees()
        this.showMessage('Registro actualizado')

      } else {
        const channel = { ...response, _id: this.getLastIndex() + 1 }
        this.data.push(channel)
        this.loadEmployees()
        this.showMessage('Registro exitoso')
      }
    })
  }

  getLastIndex() {
    return [...this.data].sort((a, b) => b._id - a._id)[0]._id
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
    this.currentPage = page
    const skip = pageSize * page
    this.records = this.data.slice(skip, skip + pageSize)
  }
}
