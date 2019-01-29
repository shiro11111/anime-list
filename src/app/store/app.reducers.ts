import * as fromAnimeState from './anime.reducers';
import { ActionReducerMap } from '@ngrx/store';
import { animeReducer } from './anime.reducers';


export interface AppState {
  animeState: fromAnimeState.AnimeState;
}

export const reducers: ActionReducerMap<AppState> = {
  animeState: animeReducer
};
