import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {QuerySuggestion, SteamService} from "../steam.service";

var mock = {suggestions: [{"appid":"433340","name":"Slime Rancher","cover":"http://cdn.edgecast.steamstatic.com/steam/apps/433340/capsule_sm_120.jpg?t=1484004155","price":"19,99€"},{"appid":"408240","name":"Slime Jumper","cover":"http://cdn.edgecast.steamstatic.com/steam/apps/408240/capsule_sm_120.jpg?t=1476489125","price":"4,99€"},{"appid":"410850","name":"DRAGON QUEST HEROES™ Slime Edition","cover":"http://cdn.edgecast.steamstatic.com/steam/apps/410850/capsule_sm_120.jpg?t=1449162079","price":"39,99€"},{"appid":"9990","name":"Ghostbusters: Sanctum of Slime","cover":"http://cdn.edgecast.steamstatic.com/steam/apps/9990/capsule_sm_120.jpg?t=1447354053","price":"9,99€"},{"appid":"270740","name":"Realm of the Mad God: Slime Priest Skin","cover":"http://cdn.edgecast.steamstatic.com/steam/apps/270740/capsule_sm_120.jpg?t=1447359809","price":""}]};

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  @ViewChild('queryInput') queryInput:ElementRef;

  suggestions: QuerySuggestion[];
  modalVisible: boolean;
  closingModal: boolean;
  closeModalTimeout: any;

  queryValue: string;
  get query () {
    return this.queryValue;
  }
  set query(value) {
    console.log('query change', value);
    this.queryValue = value;
    if(value) {
      this.steamService.getQuerySuggestions(value).subscribe(
        suggestions => this.suggestions = suggestions
      );
    } else {
      this.suggestions = [];
    }
  }

  onOpenAddModalClick () {
    this.modalVisible = true;
    var self = this;
    setTimeout(function () {
      self.queryInput.nativeElement.focus();
    }, 16);
  }

  // focus on list fix
  cancelCloseModal () {
    if(this.closeModalTimeout) {
      clearTimeout(this.closeModalTimeout);
    }
  }

  closeModal () {
    // focus on list fix
    this.closeModalTimeout = setTimeout(() => {
      // animate closing
      setTimeout(() => {
        this.closingModal = false; this.modalVisible = false
      }, 350);
      this.closingModal = true; this.query = ''},
    150);
  }

  animateAndHideModal () {
    setTimeout(() => this.modalVisible = false, 300);
  }

  onAddRemoveClick (querySuggestion: QuerySuggestion) {
    querySuggestion.addRemoveApp(this.steamService);
  }

  constructor(private steamService: SteamService) {
  }

  ngOnInit() {
  }

}
