import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class SidebarToggleService {
	private open: boolean = false;
	private isOpen$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  	constructor() { }

  	toggleSidebar(): void {
  		this.open = !this.open;
  		this.isOpen$.next(this.open);
  	}

  	getIsOpen(): Observable<boolean> {
  		return this.isOpen$;
  	}

}
