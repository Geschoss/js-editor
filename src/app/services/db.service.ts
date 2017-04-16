import { Injectable } from '@angular/core';
import { CardModel, TextModel, Model } from '../model';
import { Observable, BehaviorSubject } from 'rxjs';


const createNewItem = () =>({
    text: "mew text",
    size: 40,
    color: "#FFFFFF",
    font: "arial",
    x: 0,
    y: 0
});

// TODO можно ужеразносить на 2 файла
@Injectable()
export class DbService {
	private cardModel$: BehaviorSubject<CardModel> = new BehaviorSubject(null);
	private textModels$: BehaviorSubject<TextModel[]> = new BehaviorSubject(null);
    private selectedItem$: BehaviorSubject<TextModel> = new BehaviorSubject(null);

    setModel(model: Model) {
        this.setTextModels(model.content);
        this.setCardModel(model.background);
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
         this.textModels$
        .take(1)
        .subscribe((items: TextModel[]) => {
            let index = items.indexOf(message.item);
            if (index !== -1) {
                let newItem = Object.assign({},message.item,message.change);
                items[index] = newItem;
                this.setTextModels(items);
                this.setSelectedItem(newItem);
            }
        });
    }


    addItem() {
        this.textModels$
        .take(1)
        .subscribe(items => {
            let newItem = createNewItem();
            items.push(newItem);
            this.setTextModels(items);
            this.setSelectedItem(newItem);
        })
    }

    updateBackround(message){
        this.cardModel$
        .take(1)
        .subscribe((card: CardModel) => {
            let newCard = Object.assign({},card,message);
            this.setCardModel(newCard);
        });
    }

}
