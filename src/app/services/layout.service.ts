import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class LayoutService {
	private sidebarOpen: boolean = false;
  private editMenuOpen: boolean = true;
	private isSidebarOpen$: BehaviorSubject<boolean> = new BehaviorSubject(this.sidebarOpen);
  private isEditMenuOpen$: BehaviorSubject<boolean> = new BehaviorSubject(this.editMenuOpen);
  	constructor() { }

  	toggleSidebar(): void {
  		  this.sidebarOpen = !this.sidebarOpen;
  		  this.isSidebarOpen$.next(this.sidebarOpen);
  	}

    toggleEditMenu(): void {
        this.editMenuOpen = !this.editMenuOpen;
        this.isEditMenuOpen$.next(this.editMenuOpen);
    }

  	getIsSidebarOpen(): Observable<boolean> {
  		return this.isSidebarOpen$;
  	}



    getIsEditMenuOpen$(): Observable<boolean> {
      return this.isEditMenuOpen$;
    }

}
