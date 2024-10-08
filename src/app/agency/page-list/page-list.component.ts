import { Component, inject } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DownloadComponent } from 'src/app/shared/download/download.component';
import { KeypadButton } from 'src/app/shared/interfaces/keypad.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { FormComponent } from '../form/form.component';
import { environment } from 'src/environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAgency } from '../interfaces/IAgency';
import { AgencyService } from '../services/agency.service';

@Component({
  selector: 'qr-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent {
  data: IAgency[] = [
    // { _id: 1, name: 'Ambato', address: 'Calle A' },
    // { _id: 2, name: 'Riobamba', address: 'Calle B' },
    // { _id: 3, name: 'Quito', address: 'Calle C' },
    // { _id: 4, name: 'Cuenca', address: 'Calle D' },
    // { _id: 5, name: 'Guayaquil', address: 'Calle E' },
    // { _id: 6, name: 'Ambato', address: 'Calle A' },
    // { _id: 7, name: 'Riobamba', address: 'Calle B' },
    // { _id: 8, name: 'Quito', address: 'Calle C' },
    // { _id: 9, name: 'Cuenca', address: 'Calle D' },
    // { _id: 10, name: 'Guayaquil', address: 'Calle E' },
    // { _id: 11, name: 'Ambato', address: 'Calle A' },
    // { _id: 12, name: 'Riobamba', address: 'Calle B' },
    // { _id: 13, name: 'Quito', address: 'Calle C' },
    // { _id: 14, name: 'Cuenca', address: 'Calle D' },
    // { _id: 15, name: 'Guayaquil', address: 'Calle E' },
  ]
  metaDataColumns: MetaDataColumn[] = [
    { field: "_id", title: "ID" },
    { field: "name", title: "AGENCIA" },
    { field: "address", title: "DIRECCIÓN" }
  ]
  keypadButtons: KeypadButton[] = [
    { icon: "cloud_download", tooltip: "EXPORTAR", color: "accent", action: "DOWNLOAD" },
    { icon: "add", tooltip: "AGREGAR", color: "primary", action: "NEW" }
  ]
  records: IAgency[] = []
  totalRecords = this.data.length

  bottomSheet = inject(MatBottomSheet)
  dialog = inject(MatDialog)
  snackBar = inject(MatSnackBar)

  currentPage = 0

  agencySrv = inject(AgencyService)

  constructor() {
    this.loadAgencies()
  }

  loadAgencies() {
    // this.records = [...this.data]
    this.agencySrv.getAgencies().subscribe({
      next: (response: any[]) => {
        this.data = response.map((agency) => {
          return { _id: agency.id, name: agency.name, address: agency.address }
        })
        this.records = [...this.data]
        this.totalRecords = this.data.length
        this.changePage(this.currentPage)
      },
      error: (error) => {
        console.error(error)
      }

    })
  }

  delete(id: number) {
    // const position = this.data.findIndex(ind => ind._id === id)
    // this.records = this.data.splice(position, 1)
    this.agencySrv.deleteAgency(id).subscribe({
      next: (response) => {
        this.loadAgencies()
        this.showMessage('Registro eliminado')
      },
      error: (error) => {
        console.error(error)
      }
    })
    this.loadAgencies()
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
        // const agencia = { _id: response.id, ...response }
        // const position = this.data.findIndex(ind => ind._id === response.id)
        // this.data[position] = agencia
        this.agencySrv.updateAgency(response.id, response).subscribe({
          next: (response) => {
            this.loadAgencies()
            this.showMessage('Registro actualizado')
          },
          error: (error) => {
            console.error(error)
          }
        })
        this.loadAgencies()
        this.showMessage('Registro actualizado')

      } else {
        const agencia: IAgency = { _id: this.getLastIndex() + 1, ...response }
        // this.data.push(agencia)
        this.agencySrv.createAgency(agencia).subscribe({
          next: (response) => {
            this.loadAgencies()
            this.showMessage('Registro exitoso')
          },
          error: (error) => {
            console.error(error)
          }
        })
        this.loadAgencies()
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
        this.showBottomSheet("Lista de Agencias", "agencias", this.data)
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
