import { Component, OnInit } from '@angular/core';
import { Anime } from '../models/anime';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.reducers';
import { select, Store } from '@ngrx/store';
import { ChangeListParams, DeleteAnime, LoadAnimeList } from '../store/anime.actions';
import { AnimeState } from '../store/anime.reducers';
import { filter, map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { getListParams } from '../store/anime.selectors';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css']
})
export class AnimeListComponent implements OnInit {
  form: FormGroup;
  list$: Observable<Anime[]>;
  params$: Observable<Anime>;

  constructor(private store: Store<AppState>,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.createForm();
    this.store.dispatch(new LoadAnimeList());

    this.params$ = this.store.pipe(select(getListParams));

    this.list$ = this.store.select('animeState').pipe(
      map((state: AnimeState) => state && state.animeList));

    this.form.valueChanges.pipe(
      filter((value: Anime) => !!value)
    ).subscribe((value: Anime) => {
      this.router.navigate(['./'], { queryParams: this.form.value });
    });

    this.route.queryParams.pipe(
      filter((params: Anime) => !!params)
    ).subscribe((params: Anime) => {
      this.store.dispatch(new ChangeListParams(params));
      this.store.dispatch(new LoadAnimeList());
    });
  }

  onDelete(id: string): void {
    this.store.dispatch(new DeleteAnime(id));
    this.store.dispatch(new LoadAnimeList());
  }

  private createForm(): void {
    this.form = this.fb.group({
      title: null,
      description: null,
      releaseDate: null,
      genre: null,
      studio: null
    });
  }
}
