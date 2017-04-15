import { Component, OnInit, Input } from '@angular/core';

import { TextModel } from '../model';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {
	@Input() item: TextModel = null;
	constructor() { }

	ngOnInit() {
	}

}
