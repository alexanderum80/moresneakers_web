import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss'],
})
export class HeadingComponent implements OnInit {
  @Input() description;
  @Input() imgUrl;
  @Input() title: string;

  constructor() {}

  ngOnInit(): void {}
}
