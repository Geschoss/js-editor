import { Component, OnInit, Input } from '@angular/core';

import { TextObj } from '../model';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})
export class CardItemComponent implements OnInit {
	@Input() item: TextObj = null;
	constructor() { }

	ngOnInit() {
	}

}
