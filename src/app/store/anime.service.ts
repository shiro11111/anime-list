import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Anime } from '../models/anime';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  constructor(private http: HttpClient) {
  }

  loadAnimeList(): Observable<Anime[]> {
    return this.http.get('http://localhost:3000/api/anime/list') as Observable<Anime[]>;
  }

  addAnime(anime: Anime): any {
    return this.http.post('http://localhost:3000/api/anime/add', anime);
  }
}
