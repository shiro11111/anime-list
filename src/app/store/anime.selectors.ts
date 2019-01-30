import { createSelector } from '@ngrx/store';
import { getAnimeState } from './app.reducers';
import * as fromReducer from './anime.reducers';

export const getListParams = createSelector(
  getAnimeState, fromReducer.getAnimeParamsState
);
