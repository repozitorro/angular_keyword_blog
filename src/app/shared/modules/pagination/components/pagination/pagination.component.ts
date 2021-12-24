import {Component, Input, OnInit} from '@angular/core';
import {UtilsService} from '../../../../services/utils.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  providers: [UtilsService]
})
export class PaginationComponent implements OnInit {
  @Input('total') totalProps: number;
  @Input('limit') limitProps: number;
  @Input('url') urlProps: string;
  @Input('currentPage') currentPageProps: number;

  pageCount: number;
  pages: number[] = [1, 2];

  constructor(
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.initializePagination();
  }

  initializePagination() {
    this.pageCount = Math.ceil(this.totalProps / this.limitProps);
    this.pages = this.utilsService.range(1, this.pageCount);
  }

}
