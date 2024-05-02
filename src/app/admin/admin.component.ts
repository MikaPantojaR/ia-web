import { Component, OnInit } from '@angular/core';

import { HeaderComponent } from '../shared/header/header.component';
import { SideMenuComponent } from '../shared/side-menu/side-menu.component';

import { MenuItem } from '../shared/models/side-menu.model';
import { ADMIN_MENU_ITEMS, SERVICE_MENU_ITEMS, PACIENT_MENU_ITEMS } from '../shared/constants/menu-items.constants';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent, SideMenuComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  menuItems!: MenuItem[];

  ngOnInit(): void {
    const usuarioString = sessionStorage.getItem("usuario");
      if (usuarioString !== null) {
          const usuarioRecuperado = JSON.parse(usuarioString);
          if (usuarioRecuperado.rol === 'servicio') {
            this.menuItems = SERVICE_MENU_ITEMS
          } else if( usuarioRecuperado.rol === 'administrador') {
            this.menuItems = ADMIN_MENU_ITEMS
          } else {
            this.menuItems = PACIENT_MENU_ITEMS;
          }
      }
  }

}
