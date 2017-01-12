import { Injectable } from '@angular/core';
import { Http, Response, Jsonp } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import '../../rxjs-operators';

@Injectable()
export class SteamService {
  private steamAppsUrl = 'http://127.0.0.1:3141/steam-apps';

  constructor(private http: Http) { }

  public getApps() : Observable<SteamApp[]> {
    return this.http.get(this.steamAppsUrl)
                    .map(this.parseData)
                    .catch(this.handleError);
  }

  private parseData (response: Response) {
    return response.json().steamApps.map(v => new SteamApp(v));
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
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
  categories: Array<Object>;
  cover: string;
  background: string;

  constructor (data) {
    this.id = data.appid;
    this.categories = data.categories;
    this.cover = data.cover;
    this.background = data.background;
    this.genres = data.genres.map(genre => new Genre(genre.id, genre.description));
    this.name = data.name;
  }
}
