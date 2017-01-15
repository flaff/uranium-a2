import { Component, Input, OnInit } from '@angular/core';
import {SteamApp, SteamService} from "../steam.service";

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})

export class TileComponent implements OnInit {
  @Input() app: SteamApp;
  cover: string;

  constructor(private steamService: SteamService) { }

  ngOnInit() {
    this.cover = getCoverById(this.app.id);
  }

  onGenreClick (genre) {
    this.steamService.queryUpdate.emit(genre.name);
  }
}

function getCoverById (id) {
  return 'http://cdn.akamai.steamstatic.com/steam/apps/' + id + '/header.jpg';
}
