import { createReducer, on } from '@ngrx/store';
import {
  getCategories,
  getGenders,
  getHottestReleases,
} from './categories.action';

export const initialState = {
  categories: [],
  genders: [],
  hottestReleases: [],
};

export const categoryReducer = createReducer(
  initialState,
  on(getCategories, (state, { categories }) => ({
    ...state,
    categories: [...categories],
  })),
  on(getGenders, (state, { genders }) => ({
    ...state,
    genders: [...genders],
  })),
  on(getHottestReleases, (state, { releases }) => ({
    ...state,
    hottestReleases: releases,
  }))
);
