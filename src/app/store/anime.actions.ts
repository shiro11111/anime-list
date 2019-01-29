import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Anime } from '../models/anime';
import { Added } from '../models/added';

export const LOAD_ANIME_LIST = 'LOAD_ANIME_LIST';
export const LOAD_ANIME_LIST_SUCCESS = 'LOAD_ANIME_LIST_SUCCESS';
export const LOAD_ANIME_LIST_FAIL = 'LOAD_ANIME_LIST_FAIL';
export const ADD_ANIME = 'ADD_ANIME';
export const ADD_ANIME_SUCCESS = 'ADD_ANIME_SUCCESS';
export const ADD_ANIME_FAIL = 'ADD_ANIME_FAIL';

export class LoadAnimeList implements Action {
  readonly  type = LOAD_ANIME_LIST;
}

export class LoadAnimeListSuccess implements Action {
  readonly  type = LOAD_ANIME_LIST_SUCCESS;
  constructor(public payload: Anime[]) {}
}

export class LoadAnimeListFail implements Action {
  readonly  type = LOAD_ANIME_LIST_FAIL;
  constructor(public payload: HttpErrorResponse) {}
}

export class AddAnime implements Action {
  readonly  type = ADD_ANIME;
  constructor(public payload: Anime) {}
}

export class AddAnimeSuccess implements Action {
  readonly  type = ADD_ANIME_SUCCESS;
  constructor(public payload: Added) {}
}

export class AddAnimeFail implements Action {
  readonly  type = ADD_ANIME_FAIL;
  constructor(public payload: HttpErrorResponse) {}
}


export type AnimeActions = LoadAnimeList | LoadAnimeListSuccess | LoadAnimeListFail |AddAnime | AddAnimeSuccess | AddAnimeFail;
