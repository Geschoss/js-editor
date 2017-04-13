import { Injectable } from '@angular/core';
import { Observable, Subject} from "rxjs";
import { Model } from './model';


@Injectable()
export class EventBusService {
    protected eventBus: Subject<Model> = new Subject<Model>();
    constructor() { }

    sendMessage(model: Model){
        this.eventBus.next(model);
    }

    getMessage(): Observable<Model> {
        return this.eventBus;
    }
}
