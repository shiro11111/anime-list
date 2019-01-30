import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import { AddAnime, AddAnimeClear, DeleteAnimeClear, LoadAnimeList } from '../store/anime.actions';
import { Observable } from 'rxjs';
import { getAnimeAddSuccess } from '../store/anime.selectors';
import { filter } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  addSuccess$: Observable<boolean>;

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private dialogRef: MatDialogRef<FormComponent>
  ) {
  }

  ngOnInit() {
    this.createForm();

    this.addSuccess$ = this.store.pipe(select(getAnimeAddSuccess));

    this.addSuccess$.pipe(
      filter((success: boolean) => success)
    ).subscribe((success: boolean) => {
      this.dialogRef.close();
      this.store.dispatch(new LoadAnimeList());
      this.store.dispatch(new AddAnimeClear());
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

}
