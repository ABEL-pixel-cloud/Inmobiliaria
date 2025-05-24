import { Component,Input } from '@angular/core';
import { sidebarItem } from 'src/app/core/models/siderbarItem';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
   @Input() items: sidebarItem[] = [];

}
