import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AnimeService } from './anime.service';
import { map, switchMap } from 'rxjs/operators';
import { Anime } from '../models/anime';
import { LoadAnimeListSuccess } from './anime.actions';

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
}
