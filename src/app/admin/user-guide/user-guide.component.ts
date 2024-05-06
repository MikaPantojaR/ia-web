import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CodigoManuales } from '../manual-editor/manual-editor.component';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-guide',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './user-guide.component.html',
  styleUrl: './user-guide.component.scss'
})
export class UserGuideComponent implements OnInit {

  tipoUsuario = '';
  htmlContentAdmin: string = '';
  codigoManuales!: CodigoManuales[];
  suscripcionManuales: Subscription;

  constructor(private http: HttpClient) {
    this.suscripcionManuales = new Subscription();
  }

  ngOnInit(): void {
    const usuarioString = sessionStorage.getItem("usuario");
    const usuarioRecuperado = JSON.parse(usuarioString!);
    this.tipoUsuario = usuarioRecuperado.rol;

    this.suscripcionManuales = this.http.get<CodigoManuales[]>('http://127.0.0.1:8000/api/v1/manuals/').subscribe(response => {
      this.codigoManuales = response;
      if(this.tipoUsuario === 'administrador') {
        this.htmlContentAdmin = this.codigoManuales[1].fuente;
      } else if (this.tipoUsuario === 'paciente') {
        this.htmlContentAdmin = this.codigoManuales[2].fuente;
      } else {
        this.htmlContentAdmin = this.codigoManuales[0].fuente;
      }
    });

    
  }
}
