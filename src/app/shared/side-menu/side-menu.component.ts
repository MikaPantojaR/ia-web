import {Component, Input, OnInit} from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MenuItem } from '../models/side-menu.model';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatExpansionModule,
    MatIcon
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent implements OnInit {
  @Input()
  menuItems!: MenuItem[];

  mostrarAdminUsuarios: boolean = true;

    ngOnInit(): void {
        const usuarioString = sessionStorage.getItem("usuario");
        if (usuarioString !== null) {
            const usuarioRecuperado = JSON.parse(usuarioString);
            this.mostrarAdminUsuarios = usuarioRecuperado.rol === 'administrador';
        }
    }

}
