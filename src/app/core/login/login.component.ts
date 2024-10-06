import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormComponent } from 'src/app/shared/form/form.component';

@Component({
  selector: 'qr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  group!: FormGroup;

  constructor(private reference: MatDialogRef<FormComponent>) {}

  ngOnInit() {
    this.loadForm();
  }

  save() {
    const record = this.group.value;
    this.reference.close(record);
  }

  loadForm() {
    this.group = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }
}
