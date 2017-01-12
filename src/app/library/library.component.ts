import { Component, OnInit } from '@angular/core';
import { SteamService, SteamApp } from './steam.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
  providers: [SteamService]
})
export class LibraryComponent implements OnInit {

  apps : SteamApp[];

  constructor(private steamService: SteamService) { }
  ngOnInit() {
    this.steamService.getApps().subscribe(
      apps => this.apps = apps
    );
  }
}
