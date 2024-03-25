import { Component } from '@angular/core';

import { HeaderComponent } from '../shared/header/header.component';
import { SideMenuComponent } from '../shared/side-menu/side-menu.component';

import { MenuItem } from '../shared/models/side-menu.model';
import { ADMIN_MENU_ITEMS } from '../shared/constants/menu-items.constants';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent, SideMenuComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
    menuItems: MenuItem[] = ADMIN_MENU_ITEMS;
    username: string = 'Mikaela Pantoja';
}
