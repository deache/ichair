import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent {
  @Input() placeholder: string = "search...";
  @Output() onChange: EventEmitter<string> = new EventEmitter();
  public model: string = "";

  public emitChange() {
    this.onChange.emit(this.model);
  }
}
