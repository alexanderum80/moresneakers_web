import { Component, Input, OnInit } from '@angular/core';
import { Brand } from '../../models/brand';
import { select, Store } from '@ngrx/store';
import { selectFilterLetter } from '../../state/brand.selector';
import { setLetterFilter } from '../../state/brand.action';

@Component({
  selector: 'app-brands-page-body',
  templateUrl: './brands-page-body.component.html',
  styleUrls: ['./brands-page-body.component.scss'],
})
export class BrandsPageBodyComponent implements OnInit {
  selected = this.store.pipe(select(selectFilterLetter));
  @Input() brands: Brand[];

  constructor(private store: Store) {}

  ngOnInit(): void {}

  setLetterFilter(letter: string) {
    this.store.dispatch(setLetterFilter({ letter }));
  }
}
