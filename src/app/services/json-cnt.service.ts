import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Model } from '../model';
@Injectable()
export class JsonCntService {
	  private model$: BehaviorSubject<Model> = new BehaviorSubject(null);
  	constructor() { }

  	setModel(value: string): boolean {
  		try {
  			this.model$.next(JSON.parse(value));
  			return false;
  		}catch(err) {
  			console.log(err);
  			return true;
  		}
  	}

    getModel(): Observable<Model> {
      return this.model$;
    }
}
