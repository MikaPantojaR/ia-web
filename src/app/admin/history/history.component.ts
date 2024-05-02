import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableModule } from "@angular/material/table";
import { HistoryElement } from './history-element';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Usuario } from '../diagnostic/diagnostic.component';
import { MatDialog } from '@angular/material/dialog';
import { ImageViewComponent } from '../../shared/image-view/image-view.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit, OnDestroy {

  esAdmin: boolean = true;
  tipoDeUsuario: any;

  suscripcionDiagnosticos: Subscription;
  suscripcionUsuarios: Subscription;
  displayedColumns: string[] = ['id', 'nombre', 'email', 'observaciones', 'resultado', 'imagen'];
  allTableData: HistoryElement[] = [];
  tableData: HistoryElement[] = [];
  usuarios: Usuario[] = [];

  constructor(private http: HttpClient, public dialog: MatDialog) {
    this.suscripcionDiagnosticos = new Subscription();
    this.suscripcionUsuarios = new Subscription();
  }

  ngOnInit(): void {
    const usuarioString = sessionStorage.getItem("usuario");
    const usuarioRecuperado = JSON.parse(usuarioString!);

    this.tipoDeUsuario = usuarioRecuperado.rol;
    if (this.tipoDeUsuario === 'administrador') {
      this.esAdmin = true;
      this.suscripcionDiagnosticos = this.getTableData().subscribe(response => {
        this.allTableData = response
        this.tableData = response;
      },
        error => {
          alert('Error' + error);
        });
      this.suscripcionUsuarios = this.http.get<any>('http://127.0.0.1:8000/api/v1/users').subscribe(response => {
        this.usuarios = response;
      });

    } else {
      this.esAdmin = false;
      this.suscripcionDiagnosticos = this.getTableData().subscribe(response => {
        this.allTableData = response;
        this.tableData = this.allTableData.filter(fila => fila.email === usuarioRecuperado.email)
      },
        error => {
          alert('Error' + error);
        })
    }

  }

  getTableData() {
    return this.http.get<any>('http://127.0.0.1:8000/api/v1/diagnosticos');
  }

  verImagen(imagen: string) {
    const dialogRef = this.dialog.open(ImageViewComponent, {
      data: {valor: imagen},
    });
  }

  cambioDeUsuario(event: any) {
    const emailSeleccionado = event.value;
    console.log(emailSeleccionado);
    if (emailSeleccionado === undefined) {
      this.tableData = this.allTableData;
    } else {
      this.tableData = this.allTableData.filter(fila => fila.email === emailSeleccionado);
    }
  }

  ngOnDestroy(): void {
    this.suscripcionDiagnosticos.unsubscribe();
  }
}
