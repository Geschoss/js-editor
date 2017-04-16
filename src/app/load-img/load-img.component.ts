import { Component, EventEmitter, Output, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable,Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-load-img',
  templateUrl: './load-img.component.html',
  styleUrls: ['./load-img.component.css']
})
export class LoadImgComponent implements AfterViewInit, OnDestroy {
    private urlMsgs: Subscription;
    private urlInput: Subject<any> = new Subject<any>();
    @Output() onUpClick: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onUrlInput: EventEmitter<any> = new EventEmitter<any>();


    ngAfterViewInit() {
        this.urlMsgs = this.urlInput.debounceTime(300)
        .subscribe(item => {
            this.updateItem(item);
        });
    }

    ngOnDestroy() {
        this.urlMsgs.unsubscribe();
    }
    urlInputHandle(event: any) {
        this.urlInput.next({ backgroundUrl: event.target.value});
    }
    
    onUp() {
        this.onUpClick.next()
    }


    updateItem(change: Object) {
        this.onUrlInput.next(change);
    }

}
