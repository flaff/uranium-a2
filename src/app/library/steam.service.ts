import {Injectable, EventEmitter} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import '../../rxjs-operators';

@Injectable()
export class SteamService {
  private serverLocation: string;
  private steamAppsUrl: string;
  private addSteamAppUrl: string;
  private removeSteamAppUrl: string;
  private steamQueryUrl: string;

  public steamApps: EventEmitter<SteamApp[]>;
  public queryUpdate: EventEmitter<string>;

  constructor(private http: Http) {
    this.serverLocation = String(window.location).replace(':4200', ':3141').replace(':8080', ':3141');
    this.steamAppsUrl = this.serverLocation + 'steam-apps';
    this.addSteamAppUrl = this.steamAppsUrl + '/add/';
    this.removeSteamAppUrl = this.steamAppsUrl + '/remove/';
    this.steamQueryUrl = this.serverLocation + 'steam-search/';

    this.steamApps = new EventEmitter();
    this.queryUpdate = new EventEmitter();
  }

  public getApps() {
    this.http.get(this.steamAppsUrl)
      .map(this.parseSteamAppsResponse)
      .catch(this.handleError)
      .subscribe(apps => this.steamApps.emit(apps));
  }

  public getQuerySuggestions(query: string) : Observable<QuerySuggestion[]> {
    return this.http.get(this.steamQueryUrl + query)
      .map(this.parseQuerySuggestionsResponse)
      .catch(this.handleError);
  }

  public addSteamApp (appid: number, callback) : any {
    return this.http.get(this.addSteamAppUrl + appid)
      .map(response => response.json())
      .subscribe(response => {this.steamApps.emit(response.steamApps.map(v => new SteamApp(v))); if(callback) callback(response)});
  }

  public removeSteamApp (appid: number, callback) : any {
    return this.http.get(this.removeSteamAppUrl + appid)
      .map(response => response.json())
      .subscribe(response => {this.steamApps.emit(response.steamApps.map(v => new SteamApp(v))); if(callback) callback(response)});
  }

  private parseQuerySuggestionsResponse(response: Response) {
    return response.json().suggestions.map(v => new QuerySuggestion(v));
  }

  private parseSteamAppsResponse(response: Response) {
     return response.json().steamApps.map(v => new SteamApp(v));
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }
}


export class Genre {
  match(word) {
    return word && this.name.toLowerCase().indexOf(word.toLowerCase()) !== -1;
  }

  constructor(public id: number, public name: string) {
  }
}

export class SteamApp {
  name: string;
  id: number;
  genres: Genre[];
  categories: Array<Object>;
  cover: string;
  background: string;

  constructor(data) {
    this.id = data.appid;
    this.categories = data.categories;
    this.cover = data.cover;
    this.background = data.background;
    this.genres = data.genres.map(genre => new Genre(genre.id, genre.description));
    this.name = data.name;
  }
}

export class QuerySuggestion {
  appid: number;
  name: string;
  cover: string;
  price: string;
  inLibrary: boolean;
  inProcess: boolean;

  constructor(data) {
    this.appid = data.appid;
    this.name = data.name;
    this.cover = data.cover;
    this.price = data.price;
    this.inLibrary = data.inLibrary;
  }

  addRemoveApp (steamService: SteamService) {
    if(this.inProcess) {
      return;
    }
    this.inProcess = true;
    if(this.inLibrary) {
      steamService.removeSteamApp(this.appid, result => {this.inLibrary = !this.inLibrary; this.inProcess = false});
    } else {
      steamService.addSteamApp(this.appid, result => {this.inLibrary = !this.inLibrary; this.inProcess = false});
    }
  }
}
