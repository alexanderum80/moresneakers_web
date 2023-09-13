import { Component, Input, OnInit } from '@angular/core';
import { BlogSlider } from '../../../shared/data/slider';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  @Input() blogs: any[] = [];
  public BlogSliderConfig: any = BlogSlider;

  constructor() {}

  ngOnInit(): void {}
}
