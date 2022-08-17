import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  enterd_search:string='';
  constructor() { }

  ngOnInit(): void {
  }
  @Output() search_text_change:EventEmitter<string>=new EventEmitter<string>();

  on_search_change(){
    this.search_text_change.emit(this.enterd_search);
  }

}
