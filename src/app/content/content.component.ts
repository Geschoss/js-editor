import { Component, OnInit, EventEmitter, AfterViewInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs';

import { DraggableDirective } from '../draggable.directive';
import { SidebarToggleService } from '../services/sidebar-toggle.service';
import { DbService } from '../services/db.service';
import { CardModel, TextModel } from '../model';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, AfterViewInit {
    private isOpen$: Observable<boolean>;
	private cardModel$: Observable<CardModel>;
    private textModels$: Observable<TextModel[]>;
    private selectedIted$: Observable<TextModel>;

    constructor(private sidebarToggleService: SidebarToggleService,
                private dbService: DbService) {
  		this.isOpen$ = sidebarToggleService.getIsOpen();
  		this.cardModel$ = dbService.getCardModel();
        this.textModels$ = dbService.getTextModels();
        this.selectedIted$ = dbService.getSelectedItem();
  	}


  	ngOnInit() {
  	}

    ngAfterViewInit() {
    }
    onClickBtn() {
      this.sidebarToggleService.toggleSidebar();
    }

    onChangeItem(message) {
        this.dbService.updateItem(message);
    }

}
