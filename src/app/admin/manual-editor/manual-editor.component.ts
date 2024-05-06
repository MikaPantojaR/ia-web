import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';

export interface Manuales {
  value: string;
  viewValue: string;
}

export interface CodigoManuales {
  id: string;
  tipo: string;
  fuente: string;
}

@Component({
  selector: 'app-manual-editor',
  standalone: true,
  imports: [
    EditorModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './manual-editor.component.html',
  styleUrl: './manual-editor.component.scss'
})
export class ManualEditorComponent implements OnInit {

  manuales: Manuales[] = [
    { value: 'servicio', viewValue: 'Servicio' },
    { value: 'admin', viewValue: 'Admin' },
    { value: 'paciente', viewValue: 'Paciente' },
  ];



  dataModel = 'Seleccione un manual para editar';
  codigoManuales!: CodigoManuales[];
  manualActual = 1;
  manualTipo = 'servicio';

  suscripcionManuales: Subscription;

  constructor(private http: HttpClient) {
    this.suscripcionManuales = new Subscription();
  }

  ngOnInit(): void {
    this.suscripcionManuales = this.http.get<CodigoManuales[]>('http://127.0.0.1:8000/api/v1/manuals/').subscribe(response => {
      this.codigoManuales = response;
    });
  }

  onManualSelectionChange(event: any) {
    if (event.value === 'servicio') {
      this.dataModel = this.codigoManuales[0].fuente;
      this.manualActual = 1;
      this.manualTipo = 'servicio';
    } else if (event.value === 'admin') {
      this.dataModel = this.codigoManuales[1].fuente;
      this.manualTipo = 'admin';
      this.manualActual = 2;
    } else {
      this.dataModel = this.codigoManuales[2].fuente;
      this.manualTipo = 'paciente';
      this.manualActual = 3;
    }
  }

  guardarManual() {
    this.http.put<any>('http://127.0.0.1:8000/api/v1/manuals/' + this.manualActual + '/', {tipo: this.manualTipo, fuente: this.dataModel}).subscribe(response => {
      alert('manual guardado');
    });
    this.codigoManuales[this.manualActual - 1].fuente = this.dataModel;
  }
}
