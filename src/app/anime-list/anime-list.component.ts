import { Component, OnInit } from '@angular/core';
import { Anime } from '../models/anime';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.reducers';
import { select, Store } from '@ngrx/store';
import {
  ChangeListParams,
  DeleteAnime,
  DeleteAnimeClear,
  EditAnime,
  EditAnimeClear,
  LoadAnimeList,
  LoadStudioList
} from '../store/anime.actions';
import { AnimeState } from '../store/anime.reducers';
import { debounceTime, filter, map } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getAnimeDeleteSuccess, getListParams, getStudioList } from '../store/anime.selectors';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormComponent } from '../form/form.component';
import { Studio } from '../models/studio';

@Component({
  selector: 'app-anime-list',
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.css']
})
export class AnimeListComponent implements OnInit {
  form: FormGroup;
  list$: Observable<Anime[]>;
  deleteSuccess$: Observable<boolean>;
  params$: Observable<Anime>;
  studioList$: Observable<Studio[]>;

  displayedColumns = [
    'number',
    'title',
    'releaseDate',
    'studio',
    'actions',
    'edit'
  ];

  constructor(private store: Store<AppState>,
              private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.createForm();
    this.store.dispatch(new LoadAnimeList());
    this.store.dispatch(new LoadStudioList());

    this.params$ = this.store.pipe(select(getListParams));
    this.deleteSuccess$ = this.store.pipe(select(getAnimeDeleteSuccess));

    this.list$ = this.store.select('animeState').pipe(
      map((state: AnimeState) => state && state.animeList));

    this.studioList$ = this.store.pipe(select(getStudioList));

    this.form.valueChanges.pipe(
      filter((value: Anime) => !!value),
      debounceTime(3000)).subscribe((value: Anime) => {
      this.router.navigate(['./'], { queryParams: this.form.value });
    });

    this.route.queryParams.pipe(
      filter((params: Anime) => !!params)
    ).subscribe((params: Anime) => {
      this.store.dispatch(new ChangeListParams(params));
      this.store.dispatch(new LoadAnimeList());
    });

    this.deleteSuccess$.pipe(
      filter((success: boolean) => success)
    ).subscribe((success: boolean) => {
      this.store.dispatch(new LoadAnimeList());
      this.store.dispatch(new DeleteAnimeClear());
    });
  }

  onDelete(id: string): void {
    this.store.dispatch(new DeleteAnime(id));
  }

  onEdit(anime: Anime): void {
    let dialogRef = this.dialog.open(FormComponent, {
      data: anime
    });

    dialogRef.afterClosed().subscribe(() => {
      dialogRef = null;
    });
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
