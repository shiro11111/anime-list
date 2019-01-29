import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AnimeService } from './anime.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Anime } from '../models/anime';
import { AddAnime, AddAnimeFail, AddAnimeSuccess, LoadAnimeListSuccess } from './anime.actions';
import { Added } from '../models/added';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable()

export class AnimeEffects {
  constructor(private actions$: Actions,
              private service: AnimeService) {
  }

  @Effect() loadAnimeList$ = this.actions$.pipe(
    ofType('LOAD_ANIME_LIST'),
    switchMap(() => this.service.loadAnimeList().pipe(
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
}
