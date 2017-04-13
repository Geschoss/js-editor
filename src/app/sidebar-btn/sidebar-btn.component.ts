import { Component, OnInit, Output , EventEmitter} from '@angular/core';
import { SidebarToggleService } from '../services/sidebar-toggle.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar-btn',
  templateUrl: './sidebar-btn.component.html',
  styleUrls: ['./sidebar-btn.component.css']
})
export class SidebarBtnComponent implements OnInit {
	  @Output() onSidebarBtn: EventEmitter<boolean> = new EventEmitter();
    private isOpen$: Observable<boolean>;
  	constructor(private sidebarToggleService: SidebarToggleService){
      this.isOpen$ = sidebarToggleService.getIsOpen();
    }

  	ngOnInit() {
  	}

  	onClickBtn() {
  		this.sidebarToggleService.toggleSidebar();
  	}

}
