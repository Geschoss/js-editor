import { Component, Input } from '@angular/core';

import { TextModel } from '../model';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent {
	@Input() item: TextModel = null;
}
