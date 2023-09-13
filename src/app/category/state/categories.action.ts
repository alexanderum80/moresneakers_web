import { createAction, props } from '@ngrx/store';
import { Category } from 'src/app/home/models/category.model';
import { Release } from 'src/app/home/models/release.model';

export const getCategories = createAction(
  '[Categories] Get Categories',
  props<{ categories: Category[] }>()
);

export const getGenders = createAction(
  '[Categories] Get Genders',
  props<{ genders: Category[] }>()
);

export const getHottestReleases = createAction(
  '[Categories] Get Hottest Releases',
  props<{ releases: Release[] }>()
);
