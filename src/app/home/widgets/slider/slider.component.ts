import { Component, Input, OnInit } from '@angular/core';
import { HomeSlider } from '../../../shared/data/slider';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  @Input() sliders: any[];
  @Input() class: string;
  @Input() textClass: string;
  @Input() category: string;
  @Input() buttonText: string;
  @Input() buttonClass: string;
  public HomeSliderConfig: any = HomeSlider;

  constructor() {}

  ngOnInit(): void {}
}
