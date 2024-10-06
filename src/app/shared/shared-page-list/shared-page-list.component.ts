import { Component, inject, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DownloadComponent } from 'src/app/shared/download/download.component';
import { KeypadButton } from 'src/app/shared/interfaces/keypad.interface';
import { MetaDataColumn } from 'src/app/shared/interfaces/metacolumn.interface';
import { FormComponent } from '../form/form.component';
import { environment } from 'src/environments/environment.development';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonServiceInterface } from '../interfaces/common-services.interface';
import { AppData, DomainData } from '../interfaces/domain-data.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'qr-shared-page-list',
  templateUrl: './shared-page-list.component.html',
  styleUrls: ['./shared-page-list.component.css']
})

export class SharedPageListComponent {
  @Input()
  service!: CommonServiceInterface

  @Input()
  metaDataColumns: MetaDataColumn[] = []

  @Input()
  genFormGroup!: (data: any) => FormGroup

  data: AppData[] = []
  keypadButtons: KeypadButton[] = [
    { icon: "cloud_download", tooltip: "EXPORTAR", color: "accent", action: "DOWNLOAD" },
    { icon: "add", tooltip: "AGREGAR", color: "primary", action: "NEW" }
  ]
  records: AppData[] = []
  totalRecords = this.data.length

  bottomSheet = inject(MatBottomSheet)
  dialog = inject(MatDialog)
  snackBar = inject(MatSnackBar)

  currentPage = 0


  constructor() {
  }

  ngOnInit() {
    if (!this.service) {
      throw new Error('Service is required')
    }
    this.loadData()
  }

  loadData() {
    // this.records = [...this.data]
    this.service.getAll().subscribe({
      next: (response: DomainData[]) => {
        this.data = response.map((entitie) =>
          this.service.mapData(entitie)
        )
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
    this.service.delete(id).subscribe({
      next: (response) => {
        this.loadData()
        this.showMessage('Registro eliminado')
      },
      error: (error) => {
        console.error(error)
      }
    })
    this.loadData()
  }

  openForm(row: any | null = null) {
    const options = {
      panelClass: 'panel-container',
      disableClose: true,
      data: { row, metaDataColumns: this.metaDataColumns, genFormGroup: this.genFormGroup },
      genFormGroup: this.genFormGroup
    }
    const reference: MatDialogRef<FormComponent> = this.dialog.open(FormComponent, options)

    reference.afterClosed().subscribe((response) => {
      if (!response) { return }
      if (response.id) {
        // const agencia = { _id: response.id, ...response }
        // const position = this.data.findIndex(ind => ind._id === response.id)
        // this.data[position] = agencia
        this.service.update(response.id, response).subscribe({
          next: (response) => {
            this.loadData()
            this.showMessage('Registro actualizado')
          },
          error: (error) => {
            console.error(error)
          }
        })
        this.loadData()
        this.showMessage('Registro actualizado')

      } else {
        const entitie: AppData = { ...response }
        // this.data.push(agencia)
        this.service.create(entitie).subscribe({
          next: (response) => {
            this.loadData()
            this.showMessage('Registro exitoso')
          },
          error: (error) => {
            console.error(error)
          }
        })
        this.loadData()
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
