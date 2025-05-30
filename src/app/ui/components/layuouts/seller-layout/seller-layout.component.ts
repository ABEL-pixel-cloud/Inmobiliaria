import { Component } from '@angular/core';
import { sidebarItem } from 'src/app/core/models/siderbarItem';

@Component({
  selector: 'app-seller-layout',
  templateUrl: './seller-layout.component.html',
  styleUrls: ['./seller-layout.component.scss']
})
export class SellerLayoutComponent {
  userRole = 'vendedor';
  sidebarItems: sidebarItem[] = [
    
    { label: 'Dashboard', iconPath: '/assets/images/dashboard.png', route: '/seller/dashboard' },
    { label: 'Propiedades', iconPath: '/assets/images/home.png', route: '/seller/create-publish-homes' },
  ];

}
