import { Component, OnInit, EventEmitter, AfterViewInit, ViewChild} from '@angular/core';
import { Observable } from 'rxjs';

import { DraggableDirective } from '../draggable.directive';
import { LayoutService } from '../services/layout.service';
import { DbService } from '../services/db.service';
import { CardModel, TextModel } from '../model';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, AfterViewInit {
    private isSidebarOpen$: Observable<boolean>;
    private isEditMenuOpen$: Observable<boolean>;
	private cardModel$: Observable<CardModel>;
    private textModels$: Observable<TextModel[]>;
    private selectedIted$: Observable<TextModel>;

    constructor(private layoutService: LayoutService,
                private dbService: DbService) {
        this.isEditMenuOpen$ = layoutService.getIsEditMenuOpen$();
        this.isSidebarOpen$ = layoutService.getIsSidebarOpen();
  		this.cardModel$ = dbService.getCardModel();
        this.textModels$ = dbService.getTextModels();
        this.selectedIted$ = dbService.getSelectedItem();
  	}


  	ngOnInit() {
  	}

    ngAfterViewInit() {
    }
    onClickBtn() {
      this.layoutService.toggleSidebar();
    }

    onChangeItem(message) {
        this.dbService.updateItem(message);
    }

    onEditMenuClick() {
        this.layoutService.toggleEditMenu();
    }

    onAddClick() {
        this.dbService.addItem();
    }
}
