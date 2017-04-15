import { Directive, EventEmitter,
        AfterViewInit, OnDestroy,
        HostListener, ElementRef, Output, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { TextModel } from './model';
@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements AfterViewInit, OnDestroy {
    @Output() onChange = new EventEmitter<any>();
    @Input() item: TextModel = null;

    mouseup = new EventEmitter<MouseEvent>();
    mousedown = new EventEmitter<MouseEvent>();
    mousemove = new EventEmitter<MouseEvent>();
    mousedrag: Observable<any>;
    sub: Subscription;

    @HostListener('document:mouseup', ['$event'])
    onMouseup(event: MouseEvent) {
        this.mouseup.emit(event);
    }

    @HostListener('mousedown', ['$event'])
    onMousedown(event: MouseEvent) {
        this.mousedown.emit(event);
        return false; // Call preventDefault() on the event
    }

    @HostListener('document:mousemove', ['$event'])
    onMousemove(event: MouseEvent) {
        this.mousemove.emit(event);
    }

    constructor(public element: ElementRef) {
        this.element.nativeElement.style.position = 'absolute';


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

        this.mousedown
        .switchMap(() => this.mouseup.take(1)
        ).subscribe(()=> {
            this.onChange.next({
                        item: this.item,
                        x: this.element.nativeElement.offsetLeft,
                        y: this.element.nativeElement.offsetTop,
                    })
        });

    }

    ngOnInit() {
        this.sub = this.mousedrag.subscribe({
            next: pos => {
                this.element.nativeElement.style.top = pos.top + 'px';
                this.element.nativeElement.style.left = pos.left + 'px';
            }
        });
    }

    ngAfterViewInit() {
        this.element.nativeElement.style.top = this.item.y + 'px';
        this.element.nativeElement.style.left = this.item.x + 'px';
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
