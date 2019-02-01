import { Anime } from '../models/anime';
import {
  ADD_ANIME,
  ADD_ANIME_CLEAR,
  ADD_ANIME_FAIL,
  ADD_ANIME_SUCCESS,
  AnimeActions,
  CHANGE_ANIME_PARAMS,
  DELETE_ANIME,
  DELETE_ANIME_CLEAR,
  DELETE_ANIME_SUCCESS,
  EDIT_ANIME, EDIT_ANIME_CLEAR,
  EDIT_ANIME_FAIL,
  EDIT_ANIME_SUCCESS,
  LOAD_ANIME_LIST,
  LOAD_ANIME_LIST_FAIL,
  LOAD_ANIME_LIST_SUCCESS,
  LOAD_STUDIO_LIST,
  LOAD_STUDIO_LIST_FAIL,
  LOAD_STUDIO_LIST_SUCCESS
} from './anime.actions';
import { Added } from '../models/added';
import { Studio } from '../models/studio';

export interface AnimeState {
  animeList: Anime[];
  animeAdd: Added;
  animeListParams: Anime;
  delete: Added;
  studioList: Studio[];
  edit: Added;
}

const initialState: AnimeState = {
  animeList: [],
  animeAdd: {},
  animeListParams: null,
  delete: null,
  studioList: [],
  edit: null
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
    case CHANGE_ANIME_PARAMS:
      return {
        ...state,
        animeListParams: action.payload
      };
    case DELETE_ANIME:
      return {
        ...state
      };
    case DELETE_ANIME_SUCCESS:
      return {
        ...state,
        delete: action.payload
      };
    case DELETE_ANIME_CLEAR:
      return {
        ...state,
        delete: null
      };
    case ADD_ANIME_CLEAR:
      return {
        ...state,
        animeAdd: null
      };
    case LOAD_STUDIO_LIST:
      return {
        ...state
      };
    case LOAD_STUDIO_LIST_SUCCESS:
      return {
        ...state,
        studioList: action.payload
      };
    case LOAD_STUDIO_LIST_FAIL:
      return {
        ...state
    };
    case EDIT_ANIME:
      return {
        ...state
      };
    case EDIT_ANIME_SUCCESS:
      return {
        ...state,
        edit: action.payload
      };
    case EDIT_ANIME_FAIL:
      return {
        ...state
      };
    case EDIT_ANIME_CLEAR:
      return {
        ...state,
        edit: null
      };
    default:
      return state;
  }
}

export const getAnimeParamsState = (state: AnimeState) => state.animeListParams;
export const getAnimeDeleteState = (state: AnimeState) => state.delete;
export const getAnimeAddState = (state: AnimeState) => state.animeAdd;
export const getStudioListState = (state: AnimeState) => state.studioList;
export const getAnimeEditState = (state: AnimeState) => state.edit;

