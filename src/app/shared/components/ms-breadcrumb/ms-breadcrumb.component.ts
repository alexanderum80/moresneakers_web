import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Breadcrumb } from '../../classes/breadcrumb';

@Component({
  selector: 'app-ms-breadcrumb',
  templateUrl: './ms-breadcrumb.component.html',
  styleUrls: ['./ms-breadcrumb.component.scss'],
})
export class MsBreadcrumbComponent implements OnInit {
  @Input() title = 'Page Title';
  @Input() breadcrumb: Breadcrumb[];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToLink(item: Breadcrumb) {
    if (item.url) {
      this.router.navigate([item.url]);
    }
  }
}
