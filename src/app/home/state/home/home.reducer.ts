import { createReducer, on } from '@ngrx/store';
import { HomeLayout } from '../../models/homeLayout.model';

import { getHomeLayout } from './home.actions';

export const initialState: HomeLayout = {};

export const homeReducer = createReducer(
  initialState,
  on(getHomeLayout, (state, HomeLayout) => ({ ...HomeLayout }))
);
