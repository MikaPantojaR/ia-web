import { MenuItem } from "../models/side-menu.model";

export const ADMIN_MENU_ITEMS: MenuItem[] = [
    { title: 'Historial', path: '/admin/historial' },
    { title: 'Diagnostico', path: '/admin/diagnostico' },
    { title: 'Manual', path: '/admin/manual'}
];

export const SERVICE_MENU_ITEMS: MenuItem[] = [
    { title: 'Usuarios', path: '/admin/users' },
    { title: 'Registro', path: '/admin/registro' },
    { title: 'Editor', path: '/admin/editor' },
    { title: 'Manual', path: '/admin/manual'}
];

export const PACIENT_MENU_ITEMS: MenuItem[] = [
    { title: 'Historial', path: '/admin/historial' },
    { title: 'Manual', path: '/admin/manual'}
];
