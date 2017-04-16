import { Directive, EventEmitter,
        AfterViewInit, OnDestroy,
        HostListener, ElementRef, Output, Input } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';

import { TextModel } from './model';
@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements AfterViewInit, OnDestroy {
    @Output() onChange = new EventEmitter<any>();
    @Input() item: TextModel = null;

    mouseup = new Subject<MouseEvent>();
    mousedown = new Subject<MouseEvent>();
    mousemove = new Subject<MouseEvent>();
    mousedrag: Observable<any>;
    changePosition: Subscription;
    changeItem: Subscription;

    @HostListener('document:mouseup', ['$event'])
    onMouseup(event: MouseEvent) {
        this.mouseup.next(event);
    }

    @HostListener('mousedown', ['$event'])
    onMousedown(event: MouseEvent) {
        this.mousedown.next(event);
        return false; // Call preventDefault() on the event
    }

    @HostListener('document:mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        this.mousemove.next(event);
    }

    constructor(public element: ElementRef) {
        this.mousedrag = this.mousedown.map((event: MouseEvent) => {
            return {
                startItemX: this.element.nativeElement.offsetLeft,
                startItemY: this.element.nativeElement.offsetTop,
                clientY: event.clientY,
                clientX: event.clientX,

            };
        })
        .switchMap(
            imageOffset => this.mousemove.map((pos: MouseEvent) => ({
                left: imageOffset.startItemX + (pos.clientX - imageOffset.clientX),
                top: imageOffset.startItemY +  (pos.clientY - imageOffset.clientY)
            }))
            .takeUntil(this.mouseup)
        );

        this.changeItem = this.mousedown
        .switchMap(() => this.mouseup.take(1))
        .subscribe(()=> {
            this.onChange.next({
                        item: this.item,
                        change: {
                            x: this.element.nativeElement.offsetLeft,
                            y: this.element.nativeElement.offsetTop
                        }
                    });
        });
    }
    ngAfterViewInit() {
        this.changePosition = this.mousedrag.subscribe({
            next: pos => {
                this.element.nativeElement.style.top = pos.top + 'px';
                this.element.nativeElement.style.left = pos.left + 'px';
            }
        });
        this.element.nativeElement.style.position = 'absolute';
        this.element.nativeElement.style.top = this.item.y + 'px';
        this.element.nativeElement.style.left = this.item.x + 'px';
    }

    ngOnDestroy() {
        this.changePosition.unsubscribe();
        this.changeItem .unsubscribe()
    }

}
