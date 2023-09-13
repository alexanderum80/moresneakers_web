import { createAction, props } from '@ngrx/store';
import { Collection } from '../../home/models/collection.model';
import { Release } from '../../home/models/release.model';
import { OptionSort } from 'src/app/home/models/sortOptions';

export const getReleasesByCollection = createAction(
  '[Collections] Get Releases by Collection',
  props<{ releasesByCollection: Release[] }>()
);
export const concatReleasesByCollection = createAction(
  '[Collections] Concat Releases by Collection',
  props<{ releasesByCollection: Release[] }>()
);
export const setReleasesByCollectionCount = createAction(
  '[Collections] Set Releases by Collection count',
  props<{ count: number }>()
);

export const setCollection = createAction(
  '[Collections] Set Collection ',
  props<{ collection: Collection }>()
);

export const setLoading = createAction(
  '[Collections] Set Loading ',
  props<{ loading: boolean }>()
);

export const setSortOptions = createAction(
  '[Collections] Set Sort Options',
  props<{ sortOption: OptionSort }>()
);
