import { Component } from '@angular/core';
import { sidebarItem } from 'src/app/core/models/siderbarItem';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

sidebarItems: sidebarItem[] = [
  { label: 'Dashboard', iconPath: '/assets/images/dashboard.png', route: '/admin/dashboard' },
  { label: 'Categorías', iconPath: '/assets/images/etiqueta.png', route: '/admin/create-category' },
  { label: 'Ubicaciones', iconPath: '/assets/images/etiqueta.png', route: '/admin/create-ubication' },
  { label: 'Propiedades', iconPath: '/assets/images/home.png' }, // sin ruta
  { label: 'Usuarios', iconPath: '/assets/images/usuario.png', route: '/admin/create-user' },
  { label: 'Configuración', iconPath: '/assets/images/configuracion.png' }
];
}
