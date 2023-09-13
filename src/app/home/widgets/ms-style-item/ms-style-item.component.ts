import { Component, Input, OnInit } from '@angular/core';
import { Sneaker } from '../../models/sneaker.model';

@Component({
  selector: 'app-ms-style-item',
  templateUrl: './ms-style-item.component.html',
  styleUrls: ['./ms-style-item.component.scss'],
})
export class MsStyleItemComponent implements OnInit {
  @Input() item: Sneaker;

  constructor() {}

  ngOnInit(): void {}
}
