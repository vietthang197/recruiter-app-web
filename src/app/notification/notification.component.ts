import {Component, OnInit} from '@angular/core';
import {INotification} from "../../model/INotification";
import {NotificationHandler} from "../../handler/NotificationHandler";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements INotification, OnInit {

  notiList = []
  unReadNoti = 0

  private notificationHandler: NotificationHandler;
  constructor(notificationHandler: NotificationHandler) {
    console.log("Init notification component")
    this.notificationHandler = notificationHandler;
  }
  onMessage(message:any): void {
    // @ts-ignore
    this.notiList.push(message)
    this.unReadNoti++
  }

  ngOnInit(): void {
    this.notificationHandler.registerHandler(this);
  }

}
