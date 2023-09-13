import { Component, Input, OnInit } from '@angular/core';
import { Blog } from 'src/app/home/models/blog.model';

@Component({
  selector: 'app-blogs-list-item',
  templateUrl: './blogs-list-item.component.html',
  styleUrls: ['./blogs-list-item.component.scss'],
})
export class BlogsListItemComponent implements OnInit {
  @Input() blog: Blog;

  constructor() {}

  ngOnInit(): void {}
}
