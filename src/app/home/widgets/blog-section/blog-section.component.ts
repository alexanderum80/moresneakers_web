import { Component, Input, OnInit } from '@angular/core';
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-blog-section',
  templateUrl: './blog-section.component.html',
  styleUrls: ['./blog-section.component.scss'],
})
export class BlogSectionComponent implements OnInit {
  @Input() blog: Blog[] = [];

  constructor() {}

  ngOnInit(): void {}
}
