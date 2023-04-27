import { Component , Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @Input() type: string = 'info';
  @Input() message: string = '';
  @Input() close: Function = () => {};

  closeAlert() {
    this.close();
  }
}
