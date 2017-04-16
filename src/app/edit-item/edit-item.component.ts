import { Component,  ViewChildren, Input, EventEmitter, Output,QueryList } from '@angular/core';
import {Observable } from 'rxjs';
import { TextModel } from '../model';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent {
  	@Input() item: TextModel = null;
    @Input() open: boolean = true;
    @Output() onOpenClick: EventEmitter<boolean> = new  EventEmitter<boolean>();
    @Output() onAddClick: EventEmitter<boolean> = new  EventEmitter<boolean>();
    @Output() onItemChange: EventEmitter<any> = new  EventEmitter<any>();

    onOpen() {
        this.onOpenClick.emit(true);
    }

    onAdd() {
        this.onAddClick.next(true);
    }

    // TODO мб что лаконичнее замутить
    sizeChanged(event: any) {
        this.updateItem({
            size: parseInt(event.target.value)
        });
    }

    sizeText(event: any) {
        this.updateItem({
            text: event.target.value
        });
    }

    sizeColor(event: any) {
        this.updateItem({
            color: event.target.value
        });
    }

    sizeFont(event: any) {
        this.updateItem({
            font: event.target.value
        });
    }
    updateItem(change: Object) {
        let message = { item: this.item, change};
        this.onItemChange.next(message);
    }

}
