import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-style-page-header',
  templateUrl: './style-page-header.component.html',
  styleUrls: ['./style-page-header.component.scss'],
})
export class StylePageHeaderComponent implements OnInit {
  @Input() title = '';
  @Input() description = '';
  @Input() imgUrl = '';

  constructor() {}

  ngOnInit(): void {}
}
