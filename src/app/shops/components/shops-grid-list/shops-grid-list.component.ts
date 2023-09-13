import { Component, Input, OnInit } from '@angular/core';
import { Shop } from '../../../home/models/shop.model';
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
import { selectLoading } from '../../state/shop.selector';

@Component({
  selector: 'app-shops-grid-list',
  templateUrl: './shops-grid-list.component.html',
  styleUrls: ['./shops-grid-list.component.scss'],
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
export class ShopsGridListComponent implements OnInit {
  @Input() shops: Shop[];

  loading$ = this.store.pipe(select(selectLoading));

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
