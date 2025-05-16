import { Component,Input, Output, EventEmitter  } from '@angular/core';
import { Category } from 'src/app/core/models/category';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() currentPage = 0;
  @Input() pageSize = 0;
  @Input() categories: Category[] = [];

}
