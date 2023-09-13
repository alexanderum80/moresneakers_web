import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-gender-item',
  templateUrl: './category-gender-item.component.html',
  styleUrls: ['./category-gender-item.component.scss'],
})
export class CategoryGenderItemComponent implements OnInit {
  @Input() imageUrl: string;
  @Input() title = 'Man';
  @Input() urlParamName = 'man';
  @Input() gender = 'u';

  constructor() {}

  ngOnInit(): void {}
}
