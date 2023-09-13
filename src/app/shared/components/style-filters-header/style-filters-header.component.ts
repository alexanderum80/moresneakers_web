import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OptionSort, SORT_OPTIONS } from '../../../home/models/sortOptions';

@Component({
  selector: 'app-style-filters-header',
  templateUrl: './style-filters-header.component.html',
  styleUrls: ['./style-filters-header.component.scss'],
})
export class StyleFiltersHeaderComponent implements OnInit {
  @Input() count: number;
  @Input() length: number;
  @Input() defaultSelectedOption = 0;
  @Input() sortOptions = SORT_OPTIONS;
  @Output() sorted = new EventEmitter();
  sortText = 'Sorting items';

  constructor() {}

  ngOnInit(): void {
    this.sortText = this.sortOptions[this.defaultSelectedOption]
      ? this.sortOptions[this.defaultSelectedOption].name
      : 'Sorting items';
  }

  changeSortOption(sortOption: OptionSort) {
    this.sortText = sortOption.name;
    this.sorted.emit(sortOption);
  }
}
