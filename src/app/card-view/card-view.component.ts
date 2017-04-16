import { Component,  Input,OnChanges } from '@angular/core';

import { CardModel, TextModel  } from '../model';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnChanges {
	@Input() cardModel: CardModel = null;
  	private heightImg: number;
  	private wedthImg: number;


  	ngOnChanges(SimpleChanges) {
  		this.setSizePropery(SimpleChanges);
  	}

  	setSizePropery(SimpleChanges) {
  		let cardModel: CardModel = SimpleChanges.cardModel.currentValue,
  		    url: string = cardModel.backgroundUrl,
  		    img =  new Image();
  		img.onload = () => {
  			this.heightImg = img.height;
      		this.wedthImg = img.width;
		};
  		img.src = url;
  	}

}
