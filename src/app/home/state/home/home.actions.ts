import { createAction, props } from '@ngrx/store';
import { HomeLayout } from '../../models/homeLayout.model';

export const getHomeLayout = createAction(
  '[HOME PAGE] Get Layout',
  props<HomeLayout>()
);
