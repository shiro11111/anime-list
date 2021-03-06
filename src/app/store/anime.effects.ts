import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AnimeService } from './anime.service';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Anime } from '../models/anime';
import {
  AddAnime,
  AddAnimeFail,
  AddAnimeSuccess,
  DeleteAnime,
  DeleteAnimeFail,
  DeleteAnimeSuccess, EditAnime, EditAnimeFail, EditAnimeSuccess,
  LoadAnimeListSuccess, LoadStudioListFail, LoadStudioListSuccess
} from './anime.actions';
import { Added } from '../models/added';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getListParams } from './anime.selectors';
import { AppState } from './app.reducers';
import { Studio } from '../models/studio';

@Injectable()

export class AnimeEffects {
  constructor(private actions$: Actions,
              private service: AnimeService,
              private store: Store<AppState>) {
  }

  @Effect() loadAnimeList$ = this.actions$.pipe(
    ofType('LOAD_ANIME_LIST'),
    withLatestFrom(this.store.pipe(select(getListParams))),
    switchMap(([action, params]) => this.service.loadAnimeList(params).pipe(
      map((res: Anime[]) => (new LoadAnimeListSuccess(res)))
    ))
  );

  @Effect() addAnime$ = this.actions$.pipe(
    ofType('ADD_ANIME'),
    map((action: AddAnime) => action.payload as Anime),
    switchMap((payload: Anime) => this.service.addAnime(payload).pipe(
      map((res: Added) => new AddAnimeSuccess(res)),
      catchError((error: HttpErrorResponse) => of(new AddAnimeFail(error)))))
  );

  @Effect() deleteAnime$ = this.actions$.pipe(
    ofType('DELETE_ANIME'),
    map((action: DeleteAnime) => action.payload as string),
    switchMap((payload: string) => this.service.deleteAnime(payload).pipe(
      map((res: Added) => new DeleteAnimeSuccess(res)),
      catchError((error: HttpErrorResponse) => of(new DeleteAnimeFail(error)))))
  );

  @Effect() loadStudioList$ = this.actions$.pipe(
    ofType('LOAD_STUDIO_LIST'),
    switchMap(() => this.service.loadStudioList().pipe(
      map((res: Studio[]) => (new LoadStudioListSuccess(res))),
      catchError((error: HttpErrorResponse) => of(new LoadStudioListFail(error)))
    )));

  @Effect() editAnime$ = this.actions$.pipe(
    ofType('EDIT_ANIME'),
    map((action: EditAnime) => action.payload as Anime),
    switchMap((payload: Anime) => this.service.editAnime(payload).pipe(
      map((res: Added) => new EditAnimeSuccess(res)),
      catchError((error: HttpErrorResponse) => of(new EditAnimeFail(error)))
    )));
}
