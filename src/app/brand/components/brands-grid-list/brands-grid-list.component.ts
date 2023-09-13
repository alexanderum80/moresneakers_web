import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Brand } from '../../models/brand';
import {
  animate,
  animateChild,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { select, Store } from '@ngrx/store';
import {
  selectCurrentPage,
  selectLoading,
  selectTotalPages,
} from '../../state/brand.selector';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-brands-grid-list',
  templateUrl: './brands-grid-list.component.html',
  styleUrls: ['./brands-grid-list.component.scss'],
  animations: [
    trigger('listAnim', [
      transition(':enter', [
        query('@cardAnim', [stagger(100, animateChild())], { optional: true }),
      ]),
    ]),
    trigger('cardAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0)' }),
        animate(300, style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class BrandsGridListComponent implements OnInit, OnDestroy {
  @Input() brands: Brand[];
  @Output() paginatorEmitter: EventEmitter<boolean | number> =
    new EventEmitter();
  loading$ = this.store.pipe(select(selectLoading));
  currenPage$ = this.store.pipe(select(selectCurrentPage));
  totalPage$ = this.store.pipe(select(selectTotalPages));

  currentPage: number;
  totalPages: number;

  subscriptions: Subscription[] = [];

  // btnPagination: Array<IPages>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.subscriptions.push(
      combineLatest([this.currenPage$, this.totalPage$]).subscribe(
        ([current, total]) => {
          this.currentPage = +current;
          this.totalPages = total;
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
