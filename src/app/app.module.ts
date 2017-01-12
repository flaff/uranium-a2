import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LibraryComponent } from './library/library.component';
import { TileComponent } from './library/tile/tile.component';
import { FilterPipe } from './library/filter.pipe';
import { NameFilterPipe } from './library/name-filter.pipe';
import { GridEntryComponent } from './grid-entry/grid-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    TileComponent,
    FilterPipe,
    NameFilterPipe,
    GridEntryComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
