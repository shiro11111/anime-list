import { createSelector } from '@ngrx/store';
import { getAnimeState } from './app.reducers';
import * as fromReducer from './anime.reducers';
import { Added } from '../models/added';

export const getListParams = createSelector(
  getAnimeState, fromReducer.getAnimeParamsState
);

export const getDeleteState = createSelector(getAnimeState, fromReducer.getAnimeDeleteState);

export const getAnimeDeleteSuccess = createSelector(
  getDeleteState,
  (state: Added) => state && state.success
);

export const getAddState = createSelector(getAnimeState, fromReducer.getAnimeAddState);

export const getAnimeAddSuccess = createSelector(
  getAddState,
  (state: Added) => state && state.success
);

export const getStudioList = createSelector(
  getAnimeState, fromReducer.getStudioListState
);
