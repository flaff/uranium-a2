import { Component, Input, OnInit } from '@angular/core';
import {SteamApp} from "../steam.service";

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})

export class TileComponent implements OnInit {
  @Input() app: SteamApp;
  cover: string;

  constructor() { }

  ngOnInit() {
    this.cover = getCoverById(this.app.id);
  }
}

function getCoverById (id) {
  return 'http://cdn.akamai.steamstatic.com/steam/apps/' + id + '/header.jpg';
}
