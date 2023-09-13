import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Shop } from '../../../home/models/shop.model';
import { select, Store } from '@ngrx/store';
import { selectFilterLetter } from '../../state/shop.selector';
import { setLetterFilter } from '../../state/shop.action';

@Component({
  selector: 'app-shops-page-body',
  templateUrl: './shops-page-body.component.html',
  styleUrls: ['./shops-page-body.component.scss'],
})
export class ShopsPageBodyComponent implements OnInit {
  @Input() shops: Shop[];
  @Output() changeLetter: EventEmitter<string> = new EventEmitter();
  selected$ = this.store.pipe(select(selectFilterLetter));

  constructor(private store: Store) {}

  ngOnInit(): void {}

  setLetterFilter(letter: string) {
    this.store.dispatch(setLetterFilter({ letter }));
    this.changeLetter.emit(letter);
  }
}
