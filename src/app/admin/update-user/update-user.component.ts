import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder, FormGroup, FormsModule, Validators,
  ReactiveFormsModule,
  ɵFormGroupValue,
  ɵTypedOrUntyped
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegistryConstants } from '../../shared/constants/registry.constants';
import { CommonModule } from '@angular/common';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatIcon } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatCheckbox,
    MatRadioButton,
    MatRadioGroup,
    MatIcon,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent implements OnInit {

  registryForm!: FormGroup;
  registryConstants = RegistryConstants;


  hidePassword: boolean = true;
  private suscripcion: Subscription;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.suscripcion = new Subscription();
  }

  ngOnInit(): void {
    this.registryForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      rol: ['', [Validators.required]],
      diabetes: [false],
      fecha_nacimiento: ['', [Validators.required]]
    })
    this.registryForm.patchValue({
      nombre: this.data.nombre,
      email: this.data.email,
      password: this.data.password,
      rol: this.data.rol,
      diabetes: this.data.diabetes,
      fecha_nacimiento: this.data.fecha_nacimiento
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.registryForm.valid) {
      this.suscripcion = this.actualizar(this.registryForm.value).subscribe(
          response => {
              alert("Usuario actualizado exitosamente");
              this.registryForm.reset();
              this.registryForm.markAsUntouched();
          },
          error => {
              alert('Error de creacion: ' + error);
          })
  }
    this.dialogRef.close();
  }

  actualizar(value: any): Observable<any> {
    return this.http.put<any>('http://127.0.0.1:8000/api/v1/users/' + this.data.id + '/', value);
}
}
