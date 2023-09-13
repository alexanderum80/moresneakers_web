import { Category } from 'src/app/home/models/category.model';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent implements OnInit {
  @Input() category: Category;

  constructor(
    private router: Router,
    private store: Store,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {}

  navigateToCategory(category: Category) {
    const slug = this.utilsService.changeNameToSlug(category.name);
    const urlRouter = this.router.url.split('/');
    if (urlRouter[1] === 'categories') {
      return `/categories/${slug}/in-stock`;
    } else {
      return `/categories/${slug}`;
    }
  }
}
