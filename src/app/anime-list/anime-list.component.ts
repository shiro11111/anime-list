import { Component, OnInit } from '@angular/core';
import { Anime } from '../models/anime';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.reducers';
import { Store } from '@ngrx/store';
import { LoadAnimeList } from '../store/anime.actions';
import { AnimeState } from '../store/anime.reducers';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css']
})
export class AnimeListComponent implements OnInit {
  list$: Observable<Anime[]>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new LoadAnimeList());

    this.list$ = this.store.select('animeState').pipe(
      map((state: AnimeState) => state && state.animeList));
  }

}
