import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import { AddAnime, AddAnimeClear, EditAnime, EditAnimeClear, LoadAnimeList, LoadStudioList } from '../store/anime.actions';
import { Observable } from 'rxjs';
import { getAnimeAddSuccess, getAnimeEditSuccess, getStudioList } from '../store/anime.selectors';
import { filter } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Studio } from '../models/studio';
import { Anime } from '../models/anime';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  addSuccess$: Observable<boolean>;
  studioList$: Observable<Studio[]>;
  editSuccess$: Observable<boolean>;

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private dialogRef: MatDialogRef<FormComponent>,
              @Inject(MAT_DIALOG_DATA) private data: Anime
  ) {
  }

  ngOnInit() {
    this.createForm();

    this.addSuccess$ = this.store.pipe(select(getAnimeAddSuccess));
    this.studioList$ = this.store.pipe(select(getStudioList));
    this.editSuccess$ = this.store.pipe(select(getAnimeEditSuccess));

    this.store.dispatch(new LoadStudioList());

    if (this.data) {
      console.log(this.data);
      this.form.patchValue(this.data);
    }

    this.addSuccess$.pipe(
      filter((success: boolean) => success)
    ).subscribe((success: boolean) => {
      this.dialogRef.close();
      this.store.dispatch(new LoadAnimeList());
      this.store.dispatch(new AddAnimeClear());
    });

    this.editSuccess$.pipe(
      filter((success: boolean) => success)
    ).subscribe((success: boolean) => {
      this.dialogRef.close();
      this.store.dispatch(new LoadAnimeList());
      this.store.dispatch(new EditAnimeClear());
    });
  }

  private createForm(): void {
    this.form = this.fb.group({
      title: null,
      description: null,
      releaseDate: null,
      studio: null,
      genre: null
    });
  }

  addAnime(): void {
    this.store.dispatch(new AddAnime(this.form.value));
  }

  editAnime(): void {
    this.store.dispatch(new EditAnime({ _id: this.data._id, ...this.form.value }));
  }
}
