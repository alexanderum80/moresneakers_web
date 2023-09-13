import { Component, Input, OnInit } from '@angular/core';
import { BlogSlider } from '../../../shared/data/slider';
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-ms-blog',
  templateUrl: './ms-blog.component.html',
  styleUrls: ['./ms-blog.component.scss'],
})
export class MsBlogComponent implements OnInit {
  @Input() blogs: Blog[] = [];
  public BlogSliderConfig: any = BlogSlider;

  constructor() {}

  ngOnInit(): void {}
}
