import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import { AddAnime } from '../store/anime.actions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      title: null,
      description: null,
      releasedate: null,
      studio: null,
      genre: null
    });
  }

  addAnime(): void {
  this.store.dispatch(new AddAnime(this.form.value));
  }
}
