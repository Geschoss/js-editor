import { Component, OnInit, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';

import { SidebarToggleService } from '../services/sidebar-toggle.service';
import { JsonCntService } from '../services/json-cnt.service';
import { Model } from '../model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
	private isOpen$: Observable<boolean>;
	private model$: Observable<Model>;
  	constructor(private sidebarToggleService: SidebarToggleService,
  				private jsonCntService: JsonCntService) {
  		this.isOpen$ = sidebarToggleService.getIsOpen();
  		this.model$ = jsonCntService.getModel();

  	}


  	ngOnInit() {
  	}
}
