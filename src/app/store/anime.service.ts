import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Anime } from '../models/anime';
import { QueryParamsUtil } from '../utils/query-params.util';
import { Studio } from '../models/studio';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  constructor(private http: HttpClient) {
  }

  loadAnimeList(params: Anime): Observable<Anime[]> {
    const url = `http://localhost:3000/api/anime/list?${QueryParamsUtil.toParamsString(params)}`;
    return this.http.get(url) as Observable<Anime[]>;
  }

  addAnime(anime: Anime): any {
    return this.http.post('http://localhost:3000/api/anime/add', anime);
  }

  deleteAnime(id: string): any {
    return this.http.delete(`http://localhost:3000/api/anime/delete/${id}`);
  }

  loadStudioList(): Observable<Studio[]> {
    const url = `http://localhost:3000/api/studio/list`;
    return this.http.get(url) as Observable<Studio[]>;
  }
}
