import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OptionSort } from 'src/app/home/models/sortOptions';

@Component({
  selector: 'app-head-group-about-to-drop',
  templateUrl: './head-group-about-to-drop.component.html',
  styleUrls: ['./head-group-about-to-drop.component.scss'],
})
export class HeadGroupAboutToDropComponent implements OnInit {
  @Input() total = 0;
  @Input() count = 16;
  @Input() page = 1;
  @Input() sortOptions: OptionSort[] = [];
  @Input() defaultSelectedOption = 0;
  @Output() onSort: EventEmitter<OptionSort> = new EventEmitter();
  @Input() hideRange = false;
  sortText = 'Sorting items';
  public collapse = false;

  constructor() {}

  ngOnInit(): void {
    this.sortText = this.sortOptions[this.defaultSelectedOption]
      ? this.sortOptions[this.defaultSelectedOption].name
      : 'Sorting items';
  }

  changeSortOption(sortOption: OptionSort) {
    this.sortText = sortOption.name;
    this.onSort.emit(sortOption);
  }

  from() {
    return this.page === 1 ? 1 : this.count * (this.page - 1) + 1;
  }

  to() {
    const countReleases = this.count * this.page;
    return countReleases > this.total ? this.total : countReleases;
  }
}
