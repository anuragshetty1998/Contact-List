import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  enteredValue: string = '';

  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();

  valueChanged() {
    this.searchEvent.emit(this.enteredValue);
  }
}
