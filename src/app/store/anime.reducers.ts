import { Anime } from '../models/anime';
import {
  ADD_ANIME, ADD_ANIME_FAIL,
  ADD_ANIME_SUCCESS,
  AnimeActions,
  LOAD_ANIME_LIST,
  LOAD_ANIME_LIST_FAIL,
  LOAD_ANIME_LIST_SUCCESS
} from './anime.actions';
import { Added } from '../models/added';

export interface AnimeState {
  animeList: Anime[];
  animeAdd: Added;
}

const initialState: AnimeState = {
  animeList: [],
  animeAdd: {}
};

export function animeReducer(state = initialState, action: AnimeActions) {
  switch (action.type) {
    case LOAD_ANIME_LIST:
      return {
        ...state
      };
    case LOAD_ANIME_LIST_SUCCESS:
      return {
        ...state,
        animeList: action.payload
      };
    case LOAD_ANIME_LIST_FAIL:
      return {
        ...state
      };
    case ADD_ANIME:
      return {
        ...state
      };
    case ADD_ANIME_SUCCESS:
      return {
        ...state,
        animeAdd: {
          ...state.animeAdd,
          success: action.payload.success
        }
      };
    case ADD_ANIME_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}
