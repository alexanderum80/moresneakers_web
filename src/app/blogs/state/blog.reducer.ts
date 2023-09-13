import { createReducer, on } from '@ngrx/store';
import {
  concatBlogs,
  getHottestReleases,
  setBlogs,
  setCurrentPage,
  setLoading,
  setTotalBlogs,
  setTotalPages,
} from './blog.action';

export const initialState = {
  blogs: [],
  loading: false,
  hottestReleases: [],
  totalPages: 1,
  currentPage: 1,
  totalBlogs: 0,
};

export const blogReducer = createReducer(
  initialState,
  on(setBlogs, (state, { blogs }) => ({
    ...state,
    blogs: [...blogs],
  })),
  on(concatBlogs, (state, { blogs }) => ({
    ...state,
    blogs: [...state.blogs, ...blogs],
  })),
  on(setLoading, (state, { loading }) => ({
    ...state,
    loading,
  })),
  on(getHottestReleases, (state, { releases }) => ({
    ...state,
    hottestReleases: releases,
  })),
  on(setTotalBlogs, (state, { count }) => ({
    ...state,
    totalBlogs: count,
  })),
  on(setTotalPages, (state, { pageSize = 28 }) => ({
    ...state,
    totalPages: Math.ceil(state.totalBlogs / pageSize),
  })),
  on(setCurrentPage, (state, { current = 1 }) => ({
    ...state,
    currentPage: +current,
  }))
);
