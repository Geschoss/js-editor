import { Component, OnInit, AfterViewInit,ViewChildren, Input, EventEmitter, Output,QueryList } from '@angular/core';
import {Observable } from 'rxjs';
import { TextModel } from '../model';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit, AfterViewInit {
  	@Input() item: TextModel = null;
    @Input() open: boolean = true;
    @Output() onOpenClick: EventEmitter<boolean> = new  EventEmitter<boolean>();
    @Output() onAddClick: EventEmitter<boolean> = new  EventEmitter<boolean>();
  	constructor() {

  	}

  	ngOnInit() {

  	}

   	ngAfterViewInit() {
   	}

    onOpen() {
        this.onOpenClick.emit(true);
    }

    onAdd() {
        this.onAddClick.next(true);
    }

    sizeChanged(event: any) {
        console.log(event);
    }

}
