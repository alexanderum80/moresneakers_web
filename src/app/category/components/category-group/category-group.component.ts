import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-group',
  templateUrl: './category-group.component.html',
  styleUrls: ['./category-group.component.scss'],
})
export class CategoryGroupComponent implements OnInit {
  @Input() categories: any[] = [];

  constructor() {}

  ngOnInit(): void {}
}
