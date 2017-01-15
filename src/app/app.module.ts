import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LibraryComponent } from './library/library.component';
import { TileComponent } from './library/tile/tile.component';
import { FilterPipe } from './library/filter.pipe';
import { SearchComponent } from './library/search/search.component';
import { AddComponent } from './library/add/add.component';
import { SuggestionComponent } from './library/suggestion/suggestion.component';

@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    TileComponent,
    FilterPipe,
    SearchComponent,
    AddComponent,
    SuggestionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
