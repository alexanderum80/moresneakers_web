import { Component, Input, OnInit } from '@angular/core';
import { Blog } from 'src/app/home/models/blog.model';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.scss'],
})
export class BlogsListComponent implements OnInit {
  @Input() blogs: Blog[];
  @Input() loading: boolean;

  constructor() {}

  ngOnInit(): void {}
}
