import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { TextModel } from '../model';


@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit, AfterViewInit {
	@Input() item: TextModel = null;
  	constructor() {

  	}

  	ngOnInit() {
  	}

   	ngAfterViewInit() {
   	}

   	onSubmit() {
   		console.log(this.item);
   	}

}
