import { Injectable } from '@angular/core';
import { Model } from '../model';

@Injectable()
export class JsonConverterService {
  	constructor() { }

  	convertToJSON(value: string): Model {
  		try {
  			return <Model>JSON.parse(value);
  		}catch(err) {
  			console.log(err);
  			return null;
  		}
  	}

    convertToString(value: any): string {
        return JSON.stringify(value, undefined, 2)
    }

}
