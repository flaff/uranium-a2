import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('searchIcon') searchIcon:ElementRef;
  @ViewChild('searchInput') searchInput:ElementRef;

  @Output() queryChange = new EventEmitter();
  queryValue: string;
  searchIconHovered: boolean;

  @Input()
  get query () {
    return this.queryValue;
  }
  set query (newValue) {
    this.queryValue = newValue;
    this.queryChange.emit(this.queryValue);
  }

  constructor() {
    this.query = '';
  }

  ngOnInit() {
  }

  onSearchIconClick () {
    if(this.searchIconHovered && this.query) {
      this.query = '';
    } else {
      this.searchInput.nativeElement.focus();
    }
  }

  onSearchIconMouseover () {
    this.searchIconHovered = true;
  }

  onSearchIconMouseout () {
    this.searchIconHovered = false;
  }

  onSearchFocus () {
    this.searchIcon.nativeElement.classList.add('focused');
  }

  onSearchBlur () {
    this.searchIcon.nativeElement.classList.remove('focused');
  }
}
