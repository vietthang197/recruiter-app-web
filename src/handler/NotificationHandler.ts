import {Injectable} from "@angular/core";
import {INotification} from "../model/INotification";

@Injectable({
  providedIn: 'root',
})
export class NotificationHandler {
  private _handlerRegister: INotification[] = [];

  registerHandler(handler: INotification): void {
    this._handlerRegister.push(handler);
  }


  get handlerRegister(): INotification[] {
    return this._handlerRegister;
  }
}
