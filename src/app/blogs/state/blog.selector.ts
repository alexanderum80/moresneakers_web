import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';

export const selectBLogs = (state: AppState) => state.blogsModule;

export const selectBlogsList = createSelector(
  selectBLogs,
  state => state.blogs
);

export const selectLoading = createSelector(
  selectBLogs,
  state => state.loading
);

export const selectHottestReleases = createSelector(
  selectBLogs,
  state => state.hottestReleases
);

// Pagination
export const selectCurrentPage = createSelector(
  selectBLogs,
  state => state.currentPage
);

export const selectTotalPages = createSelector(
  selectBLogs,
  state => state.totalPages
);
