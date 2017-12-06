import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';


enum messageType {
  ERROR = 'negative',
  SUCCESS = 'success',
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() messageType: messageType;
  @Input() text: string;
  private isActive: Boolean = true;
  constructor() {
    this.messageType = messageType.ERROR;
  }

  ngOnInit() {
  }

  close() {
    this.isActive = false;
  }

}
