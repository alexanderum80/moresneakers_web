import { AppState } from '../../state/app.state';
import { createSelector } from '@ngrx/store';

export const selectCollectionModule = (state: AppState) =>
  state.collectionModule.collection;

export const selectReleasesByCollection = createSelector(
  selectCollectionModule,
  state => state.releasesByCollection
);
export const selectReleasesByCollectionCount = createSelector(
  selectCollectionModule,
  state => state.count
);

export const selectCollection = createSelector(
  selectCollectionModule,
  state => state.collection
);

export const selectLoading = createSelector(
  selectCollectionModule,
  state => state.loading
);
