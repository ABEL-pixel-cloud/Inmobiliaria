import { Component,Input  } from '@angular/core';
import { Category } from 'src/app/core/models/category';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() columns: { field: string, header: string }[] = [];
  @Input() currentPage!: number;
  @Input() pageSize!: number;

}
