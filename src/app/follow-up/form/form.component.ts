import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'qr-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  title = ""
  group!: FormGroup

  constructor(
    private reference: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data ? "EDITAR" : "NUEVO"
  }

  ngOnInit() {
    this.loadForm()
  }

  save() {
    const record = this.group.value
    this.reference.close(record)
  }

  loadForm() {
    this.group = new FormGroup({
      id: new FormControl(this.data?._id),
      reason: new FormControl(this.data?.reason, Validators.required),
      status: new FormControl(this.data?.status, Validators.required),
    })
  }
}
