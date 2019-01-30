import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AnimeListComponent } from './anime-list/anime-list.component';
import { AnimeComponent } from './anime/anime.component';
import { AnimeService } from './store/anime.service';
import { reducers } from './store/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AnimeEffects } from './store/anime.effects';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatDialogModule, MatInputModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AnimeListComponent,
    AnimeComponent,
    FormComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    MatCardModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      AnimeEffects
    ]),
    FormsModule,
    ReactiveFormsModule,
    StoreDevtoolsModule.instrument()
  ],
  providers: [AnimeService],
  entryComponents: [FormComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
