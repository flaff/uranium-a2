import { Injectable } from '@angular/core';

let response = [
  {"57690": {"data": { "name": "Tropico 4: Steam Special Edition", "steam_appid": 57690, "categories":[{"id":2,"description":"Jeden gracz"},{"id":29,"description":"Karty kolekcjonerskie Steam"}],"genres":[{"id":"28","description":"Symulacje"},{"id":"2","description":"Strategie"}]}}},
  {"57620": {"data": { "name":"Slime Rancher","steam_appid": 433340, "categories": [], "genres": []}}}
];

@Injectable()
export class SteamService {

  constructor() { }

  public getApps() : SteamApp[] {
    return response.map(v => new SteamApp(v));
  }

}


export class Genre {
  match (word) {
    return word && this.name.toLowerCase().indexOf(word.toLowerCase()) !== -1;
  }
  constructor (public id: number, public name: string) {}
}

export class SteamApp {
  name: string;
  id: number;
  genres: Genre[];

  constructor (data) {
    this.id = +Object.keys(data)[0];
    data = data[this.id].data;

    this.genres = data.genres.map(genre => new Genre(genre.id, genre.description));
    this.name = data.name;
  }
}
