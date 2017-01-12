import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LibraryComponent } from './library/library.component';
import { TileComponent } from './library/tile/tile.component';
import { FilterPipe } from './library/filter.pipe';
import { GridEntryComponent } from './grid-entry/grid-entry.component';
import { SearchComponent } from './library/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    TileComponent,
    FilterPipe,
    GridEntryComponent,
    SearchComponent,
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
