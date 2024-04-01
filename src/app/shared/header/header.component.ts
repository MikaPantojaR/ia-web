import {Component, Input, OnInit} from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { HeaderConstants } from '../constants/header.constants';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  headerConstants = HeaderConstants;

    constructor(private router: Router) {
    }


    @Input()
    username!: string;

    goToLogin() {
        sessionStorage.clear();
        this.router.navigate(["/login"]);
    }

    ngOnInit(): void {
        const usuarioString = sessionStorage.getItem("usuario");
        if (usuarioString !== null) {
            const usuarioRecuperado = JSON.parse(usuarioString);
            this.username = usuarioRecuperado.nombre;
        }
    }
}
