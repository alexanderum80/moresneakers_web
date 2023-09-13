import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ms-filter-tags',
  templateUrl: './ms-filter-tags.component.html',
  styleUrls: ['./ms-filter-tags.component.scss'],
})
export class MsFilterTagsComponent implements OnInit {
  @Input() tags: any[] = [];

  constructor() {}

  ngOnInit(): void {}

  // Remove Tag
  removeTag(tagIndex) {
    this.tags.splice(tagIndex, 1);
  }

  // Clear Tags
  removeAllTags() {
    this.tags = [];
  }
}
