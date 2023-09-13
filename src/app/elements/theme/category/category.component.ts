import { Component, OnInit } from '@angular/core';
import { CategorySlider } from '../../../shared/data/slider';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  public CategorySliderConfig: any = CategorySlider;

  constructor() {}

  ngOnInit(): void {}
}
