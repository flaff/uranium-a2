import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SteamService, SteamApp } from './steam.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
  providers: [SteamService]
})
export class LibraryComponent implements OnInit {
  @ViewChild('searchIcon') searchIcon:ElementRef;

  apps : SteamApp[];

  constructor(private steamService: SteamService) { }
  ngOnInit() {
    this.apps = this.steamService.getApps();
    console.log(this);
  }

  onSearchFocus () {
    console.log(this.searchIcon);
    this.searchIcon.nativeElement.classList.add('focused');
  }

  onSearchBlur () {
    this.searchIcon.nativeElement.classList.remove('focused');
  }
}
