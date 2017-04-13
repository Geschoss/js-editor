import { Component, OnInit, Input } from '@angular/core';

import { Model } from '../model';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnInit {
	@Input() model: Model = null;
  	constructor() { }

	ngOnInit() {
  	}

}
