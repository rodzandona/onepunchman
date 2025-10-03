import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-barcode',
  template: '',
  standalone: true
})
export class BarcodeComponent {
  @Output() scanned = new EventEmitter<string>();

  private buffer = '';

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (this.buffer.trim() !== '') {
        this.scanned.emit(this.buffer.toUpperCase());
        this.buffer = '';
      }
    } else {
      this.buffer += event.key;
    }
  }
}
