import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Release } from '../../../home/models/release.model';
import { OptionSort } from 'src/app/home/models/sortOptions';

@Component({
  selector: 'app-style-main-group',
  templateUrl: './style-main-group.component.html',
  styleUrls: ['./style-main-group.component.scss'],
})
export class StyleMainGroupComponent implements OnInit {
  @Input() releases: Release[];
  @Input() count: number;
  @Input() loading: boolean;
  @Output() changeSortOption: EventEmitter<OptionSort> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  changeSort(sortOption: OptionSort) {
    this.changeSortOption.emit(sortOption);
  }
}
