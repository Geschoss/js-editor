import { Directive, EventEmitter, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {
    mouseup = new EventEmitter<MouseEvent>();
    mousedown = new EventEmitter<MouseEvent>();
    mousemove = new EventEmitter<MouseEvent>();
    mousedrag: any;

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
        this.element.nativeElement.style.position = 'relative';
        this.element.nativeElement.style.cursor = 'pointer';

        this.mousedrag = this.mousedown.map((event: MouseEvent) => {
            console.log("Относительно страницы top",this.element.nativeElement.getBoundingClientRect().top);
            console.log("Относительно страницы left", this.element.nativeElement.getBoundingClientRect().left);
            console.log("Относительно div offsetLeft", this.element.nativeElement.offsetLeft);
            console.log("Относительно div offsetTop", this.element.nativeElement.offsetTop);
            console.log(this.element.nativeElement.style.top);
            console.log(this.element.nativeElement.style.left);
            console.log("Y",event.clientY - this.element.nativeElement.getBoundingClientRect().top);
            console.log("X",event.clientX - this.element.nativeElement.getBoundingClientRect().left);
            console.log("Sart: offsetX,offsetY",event.offsetX,event.offsetY);
            
            return {
                offsetX: event.offsetX,
                offsetY: event.offsetY,
            };
        })
        .switchMap(
            imageOffset => this.mousemove.map((pos: MouseEvent) => ({
                left: pos.clientX - imageOffset.offsetX,
                top: pos.clientY - imageOffset.offsetY
            }))
            .takeUntil(this.mouseup)
        );
    }

    ngOnInit() {
        this.mousedrag.subscribe({
            next: pos => {
                this.element.nativeElement.style.top = pos.top + 'px';
                this.element.nativeElement.style.left = pos.left + 'px';
            }
        });
    }

}
