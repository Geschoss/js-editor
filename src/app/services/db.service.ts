import { Injectable } from '@angular/core';
import { CardModel, TextModel, Model } from '../model';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable()
export class DbService {
	private cardModel$: BehaviorSubject<CardModel> = new BehaviorSubject(null);
	private textModels$: BehaviorSubject<TextModel[]> = new BehaviorSubject(null);
  private selectedItem$: BehaviorSubject<TextModel> = new BehaviorSubject(null);
  	constructor() { }

    setModel(model: Model) {
        this.setTextModels(model.content);
        this.setCardModel({
            backgroundUrl: model.backgroundUrl,
            'x-size': model['x-size'],
            'y-size': model['y-size']
        });
        this.setSelectedItem(null);
    }

  	getCardModel(): Observable<CardModel> {
  		return this.cardModel$;
  	}

  	getTextModels(): Observable<TextModel[]> {
  		return this.textModels$;
  	}

    getSelectedItem(): Observable<TextModel> {
      return this.selectedItem$;
    }

  	setCardModel(model: CardModel) {
  		this.cardModel$.next(model);
  	}

  	setTextModels(models: TextModel[]) {
  		this.textModels$.next(models);
  	}

    setSelectedItem(models: TextModel) {
      this.selectedItem$.next(models);
    }

    updateItem(message) {
        /*
        Observable.from(item)
        .withLatestFrom(this.textModels$)
        .subscribe(([first, second]) => {
            return `First Source (5s): ${first} Second Source (1s): ${second}`;
        });
        */
        this.textModels$
        .take(1)
        .subscribe((items: TextModel[]) => {
            let index = items.indexOf(message.item);
            if (index !== -1) {
                let newItem = Object.assign({},message.item,{
                    x: message.x,
                    y: message.y,
                });
                items[index] = newItem;
                this.setTextModels(items);
                this.setSelectedItem(newItem);
            }
        });
    }
}
