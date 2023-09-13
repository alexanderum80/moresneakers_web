import { Component, Input, OnInit } from '@angular/core';
import { LogoSlider } from '../../../shared/data/slider';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  @Input() logos: any[] = [];
  public LogoSliderConfig: any = LogoSlider;

  constructor() {}

  ngOnInit(): void {}
}
