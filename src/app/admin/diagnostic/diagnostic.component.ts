import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

export interface Usuario {
  id: number;
  email: string;
  nombre: string;
  password: string;
  rol: string;
  diabetes: boolean;
  fecha_nacimiento: Date;
}

@Component({
  selector: 'app-diagnostic',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule],
  templateUrl: './diagnostic.component.html',
  styleUrl: './diagnostic.component.scss'
})
export class DiagnosticComponent implements OnInit, OnDestroy {

  diagnosticoForm!: FormGroup;
  usuarios: Usuario[] = [];
  currentImage: any;

  selectedImage: string | ArrayBuffer | null = null;

  private suscripcion: Subscription;
  private suscripcionUsers: Subscription;
  private apiUrl = "http://127.0.0.1:8000/api/v1/validate-image/";

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.suscripcion = new Subscription();
    this.suscripcionUsers = new Subscription();
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
    this.suscripcionUsers.unsubscribe();
  }

  ngOnInit(): void {
    this.diagnosticoForm = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      observaciones: ['', [Validators.required]]
    });

    this.suscripcionUsers = this.http.get<any>('http://127.0.0.1:8000/api/v1/users').subscribe(response => {
      this.usuarios = response;
    });

  }

  handleImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
      };
      reader.readAsDataURL(file);

      this.saveImageToFileSystem(file);
    }
  }

  saveImageToFileSystem(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      const filePath = `${file.name}`;

      this.currentImage = base64String;
    };
    reader.readAsDataURL(file);
  }

  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('imageFile', this.dataURItoBlob(this.currentImage));
    formData.append('email', this.diagnosticoForm.get('usuario')?.value); // Agregar el correo electrónico
    formData.append('observaciones', this.diagnosticoForm.get('observaciones')?.value); // Agregar las observaciones


    // Realizar la solicitud POST al endpoint
    this.suscripcion = this.http.post<any>(this.apiUrl, formData).subscribe(response => {
      alert('diagnostico: ' + response.mensaje + '\ndiagnostico guardado');
    });
    this.diagnosticoForm.reset();
    this.selectedImage = null;
    this.diagnosticoForm.markAsUntouched();
  }

}
