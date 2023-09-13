import { createReducer, on } from '@ngrx/store';
import {
  concatReleasesByCollection,
  getReleasesByCollection,
  setCollection,
  setLoading,
  setReleasesByCollectionCount,
  setSortOptions,
} from './collection.action';

export const initialState = {
  releasesByCollection: [],
  collection: null,
  loading: false,
  sortOption: null,
};

export const collectionReducer = createReducer(
  initialState,
  on(getReleasesByCollection, (state, { releasesByCollection }) => ({
    ...state,
    releasesByCollection,
  })),
  on(concatReleasesByCollection, (state, { releasesByCollection }) => ({
    ...state,
    releasesByCollection: [
      ...state.releasesByCollection,
      ...releasesByCollection,
    ],
  })),
  on(setReleasesByCollectionCount, (state, { count }) => ({
    ...state,
    count,
  })),
  on(setCollection, (state, { collection }) => ({
    ...state,
    collection,
  })),
  on(setLoading, (state, { loading }) => ({
    ...state,
    loading,
  })),
  on(setSortOptions, (state, { sortOption }) => ({
    ...state,
    sortOption,
  }))
);
