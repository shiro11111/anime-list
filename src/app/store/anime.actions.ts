import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Anime } from '../models/anime';
import { Added } from '../models/added';
import { Studio } from '../models/studio';

export const LOAD_ANIME_LIST = 'LOAD_ANIME_LIST';
export const LOAD_ANIME_LIST_SUCCESS = 'LOAD_ANIME_LIST_SUCCESS';
export const LOAD_ANIME_LIST_FAIL = 'LOAD_ANIME_LIST_FAIL';
export const ADD_ANIME = 'ADD_ANIME';
export const ADD_ANIME_SUCCESS = 'ADD_ANIME_SUCCESS';
export const ADD_ANIME_FAIL = 'ADD_ANIME_FAIL';
export const CHANGE_ANIME_PARAMS = 'CHANGE_ANIME_PARAMS';
export const DELETE_ANIME = 'DELETE_ANIME';
export const DELETE_ANIME_SUCCESS = 'DELETE_ANIME_SUCCESS';
export const DELETE_ANIME_FAIL = 'DELETE_ANIME_FAIL';
export const DELETE_ANIME_CLEAR = 'DELETE_ANIME_CLEAR';
export const ADD_ANIME_CLEAR = 'ADD_ANIME_CLEAR';
export const EDIT_ANIME_CLEAR = 'EDIT_ANIME_CLEAR';
export const LOAD_STUDIO_LIST = 'LOAD_STUDIO_LIST';
export const LOAD_STUDIO_LIST_SUCCESS = 'LOAD_STUDIO_LIST_SUCCESS';
export const LOAD_STUDIO_LIST_FAIL = 'LOAD_STUDIO_LIST_FAIL';
export const EDIT_ANIME = 'EDIT_ANIME';
export const EDIT_ANIME_SUCCESS = 'EDIT_ANIME_SUCCESS';
export const EDIT_ANIME_FAIL = 'EDIT_ANIME_FAIL';

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

export class ChangeListParams implements Action {
  readonly type = CHANGE_ANIME_PARAMS;
  constructor(public payload: Anime) {}
}

export class DeleteAnime implements  Action {
  readonly  type = DELETE_ANIME;
  constructor(public payload: string) {}
}

export class DeleteAnimeSuccess implements  Action {
  readonly  type = DELETE_ANIME_SUCCESS;
  constructor(public payload: Added) {}
}

export class DeleteAnimeFail implements  Action {
  readonly  type = DELETE_ANIME_FAIL;
  constructor(public payload: HttpErrorResponse) {}
}

export class DeleteAnimeClear implements  Action {
  readonly  type = DELETE_ANIME_CLEAR;
  constructor(public payload = null) {}
}

export class AddAnimeClear implements  Action {
  readonly  type = ADD_ANIME_CLEAR;
  constructor(public payload = null) {}
}

export class EditAnimeClear implements Action {
  readonly type = EDIT_ANIME_CLEAR;
  constructor(public payload = null) {}
}


export class LoadStudioList implements Action {
  readonly  type = LOAD_STUDIO_LIST;
}

export class LoadStudioListSuccess implements Action {
  readonly  type = LOAD_STUDIO_LIST_SUCCESS;
  constructor(public payload: Studio[]) {}
}

export class LoadStudioListFail implements Action {
  readonly  type = LOAD_STUDIO_LIST_FAIL;
  constructor(public payload: HttpErrorResponse) {}
}

export class EditAnime implements Action {
  readonly  type = EDIT_ANIME;
  constructor(public payload: Anime) {}
}

export class EditAnimeSuccess implements Action {
  readonly  type = EDIT_ANIME_SUCCESS;
  constructor(public payload: Added) {}
}

export class EditAnimeFail implements Action {
  readonly  type = EDIT_ANIME_FAIL;
  constructor(public payload: HttpErrorResponse) {}
}



export type AnimeActions = LoadAnimeList | LoadAnimeListSuccess | LoadAnimeListFail |AddAnime | AddAnimeSuccess | AddAnimeFail |
  ChangeListParams | DeleteAnime | DeleteAnimeSuccess | DeleteAnimeFail | DeleteAnimeClear | AddAnimeClear | LoadStudioList |
  LoadStudioListSuccess | LoadStudioListFail | EditAnime | EditAnimeSuccess | EditAnimeFail | EditAnimeClear;
