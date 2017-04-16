import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class LayoutService {
	private sidebarOpen: boolean = false;
    private editMenuOpen: boolean = false;
    private loadMenuOpen: boolean = false;
	private isLoadMenuOpen$: BehaviorSubject<boolean> = new BehaviorSubject(this.loadMenuOpen);
    private isSidebarOpen$: BehaviorSubject<boolean> = new BehaviorSubject(this.sidebarOpen);
    private isEditMenuOpen$: BehaviorSubject<boolean> = new BehaviorSubject(this.editMenuOpen);
  	
  	toggleSidebar(): void {
  		  this.sidebarOpen = !this.sidebarOpen;
  		  this.isSidebarOpen$.next(this.sidebarOpen);
  	}

    toggleEditMenu(): void {
        this.editMenuOpen = !this.editMenuOpen;
        this.isEditMenuOpen$.next(this.editMenuOpen);
    }


    toggleLoadMenu(): void {
        this.loadMenuOpen = !this.loadMenuOpen;
        this.isLoadMenuOpen$.next(this.loadMenuOpen);
    }

  	getIsSidebarOpen(): Observable<boolean> {
  		return this.isSidebarOpen$;
  	}



    getIsEditMenuOpen$(): Observable<boolean> {
      return this.isEditMenuOpen$;
    }

    getIsLoadMenuOpen(): Observable<boolean> {
       return this.isLoadMenuOpen$;
    }

}
