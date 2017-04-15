import { Component, OnInit, Input,OnChanges } from '@angular/core';

import { CardModel, TextModel  } from '../model';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnInit,OnChanges {
	@Input() cardModel: CardModel = null;
  	private heightImg: number;
  	private wedthImg: number;

  	constructor() { }

	ngOnInit() {
  	}

  	ngOnChanges(SimpleChanges) {
  		this.setSizePropery(SimpleChanges);

  	}

  	setSizePropery(SimpleChanges) {
  		let cardModel: CardModel = SimpleChanges.cardModel.currentValue;
  		let url: string = cardModel.backgroundUrl;
  		let img =  new Image();
  		img.onload = () => {
  			this.heightImg = img.height;
      		this.wedthImg = img.width;
		};
  		img.src = url;
  	}

}
