import { Component, EventEmitter, ViewChild} from '@angular/core';
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
export class ContentComponent {
    private isSidebarOpen$:     Observable<boolean>;
    private isEditMenuOpen$:    Observable<boolean>;
    private isLoadMenuOpen$:    Observable<boolean>;
	private cardModel$:         Observable<CardModel>;
    private textModels$:        Observable<TextModel[]>;
    private selectedIted$:      Observable<TextModel>;

    constructor(private layoutService: LayoutService,
                private dbService: DbService) {
        this.isEditMenuOpen$    = layoutService.getIsEditMenuOpen$();
        this.isSidebarOpen$     = layoutService.getIsSidebarOpen();
        this.isLoadMenuOpen$     = layoutService.getIsLoadMenuOpen();
        this.cardModel$         = dbService.getCardModel();
        this.textModels$        = dbService.getTextModels();
        this.selectedIted$      = dbService.getSelectedItem();

  	}

    onSidebarBtn() {
      this.layoutService.toggleSidebar();
    }

    onEditMenuClick() {
        this.layoutService.toggleEditMenu();
    }

    onAddClick() {
        this.dbService.addItem();
    }

    onItemChange(message) {
        this.dbService.updateItem(message);
    }

    onImageLoadBtn() {
        this.layoutService.toggleLoadMenu();
    }

    onLoadMenuUpClick() {
        this.layoutService.toggleLoadMenu();
    }


    onUrlChage(change: Object) {
        this.dbService.updateBackround(change);
    }
}
