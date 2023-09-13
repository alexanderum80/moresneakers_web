import { IPage } from '../../classes/page';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalPages: number;
  @Input() current: number;
  @Output() page: EventEmitter<number> = new EventEmitter<number>();
  url;
  currentPage: IPage;
  maxPages = 10;
  blockPage = 50;
  listPages: Array<IPage>;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.generateListPages();
  }

  ngOnChanges(changes) {
    this.url = this.router.url.split('?')[0];
    if (changes.totalPages || changes.current) {
      this.generateListPages();
    }
  }

  prevFirstPage() {
    return { page: 1 };
  }

  prevQueryPage() {
    const to =
      this.currentPage.value > 1
        ? this.currentPage.value - 1
        : this.currentPage.value;
    return { page: to };
  }

  nextQueryPage() {
    const to =
      this.currentPage.value >= this.totalPages
        ? this.totalPages
        : this.currentPage.value + 1;
    return { page: to };
  }

  lastQueryPage() {
    return { page: this.totalPages };
  }

  getPageQueryFirst(page: number) {
    return page === 1 ? { page: null } : { page };
  }

  generateListPages() {
    const currentValue = +this.current;
    this.listPages = new Array<IPage>();

    this.currentPage = {
      name: `${this.current}`,
      value: currentValue,
      url: `${this.url}/`,
    };

    if (this.totalPages - this.maxPages < currentValue) {
      for (let i = 0; i < this.maxPages; i++) {
        if (currentValue + i <= this.totalPages) {
          this.listPages.push({
            name: `${currentValue + i}`,
            value: currentValue + i,
            url: `${this.url}/`,
          });
        }
      }
    } else {
      for (
        let i = currentValue;
        i < Math.min(currentValue + this.maxPages - 1, this.totalPages);
        i++
      ) {
        this.listPages.push({ name: `${i}`, value: i, url: `${this.url}/` });
      }

      if (
        currentValue + this.maxPages - 2 < this.totalPages &&
        currentValue + this.blockPage - 1 < this.totalPages
      ) {
        this.listPages.push({ name: `...`, value: -1 });
        this.listPages.push({
          name: `${currentValue + this.blockPage - 1}`,
          value: currentValue + this.blockPage - 1,
        });
      }
    }
  }
}
