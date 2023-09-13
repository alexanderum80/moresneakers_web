import { AppState } from 'src/app/state/app.state';

export const selectBlogs = (state: AppState) => state.homeModule.blogs;
