import { Component, Inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MetaDataColumn } from 'src-b/app/shared/interfaces/matacolumn.interface';

interface DialogData {
  row: any,
  metaDataColumns: MetaDataColumn[],
  genFormGroup: (data: any) => FormGroup
}

@Component({
  selector: 'qr-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  metaDataColumns: MetaDataColumn[] = [];

  title = '';
  group!: FormGroup;

  constructor(
    private reference: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    console.log('data', data);
    this.title = data.row ? 'EDITAR' : 'NUEVO';
    this.metaDataColumns = data.metaDataColumns.map((column) => {
      if (column.field === '_id') {
        return { ...column, field: 'id' }
      }
      return column
    })
  }

  ngOnInit() {
    this.loadForm();
    console.log('group', this.group);
  }

  save() {
    const record = this.group.value;
    this.reference.close(record);
  }

  loadForm() {
    this.group = this.data.genFormGroup(this.data.row);
  }
}
