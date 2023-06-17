import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from "rxjs/webSocket";
import {NotificationHandler} from "../handler/NotificationHandler";
import {retry, RetryConfig} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class NotificationServices {
  private client: WebSocketSubject<String>;

  retryConfig: RetryConfig = {
    delay: 3000,
  };

  constructor(notiHandler: NotificationHandler) {
    this.client = webSocket(environment.SERVER_URL.SOCKET_ENDPOINT + environment.SERVER_URL.WEBSOCKET_NOTIFICATION_URL)
    this.client.pipe(retry(this.retryConfig)).subscribe({
      next: msg => {
        // @ts-ignore
        notiHandler.handlerRegister.forEach(handlerItem => {
          // @ts-ignore
          handlerItem.onMessage(msg)
        })
      }
    });
  }
}
