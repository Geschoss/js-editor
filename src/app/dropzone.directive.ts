import { Directive, EventEmitter, ElementRef, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDropzone]'
})
export class DropzoneDirective {
    @Output() public fileOver:EventEmitter<boolean> = new EventEmitter();
    @Output() public onFileDrop:EventEmitter<File[]> = new EventEmitter<File[]>();
    protected element: ElementRef;
    constructor() { }
    
    @HostListener('drop',['$event'])
    public onDrop(event: any): void {
        let transfer = this._getTransfer(event);
        if (!transfer) {
          return;
        }
        this._preventAndStop(event);
        this.fileOver.emit(false);
        this.onFileDrop.emit(transfer.files);
    }

    @HostListener('dragover', ['$event'])
    public onDragOver(event:any):void {
        let transfer = this._getTransfer(event);
        if (!this._haveFiles(transfer.types)) {
          return;
        }

        transfer.dropEffect = 'copy';
        this._preventAndStop(event);
        this.fileOver.emit(true);
    }

    @HostListener('dragleave', ['$event'])
    public onDragLeave(event:any):any {
        if ((this as any).element) {
            if (event.currentTarget === (this as any).element[0]) {
                return;
            }
        }

        this._preventAndStop(event);
        this.fileOver.emit(false);
    }

    
    // utils
    protected _getTransfer(event:any):any {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
    }

    protected _preventAndStop(event:any):any {
        event.preventDefault();
        event.stopPropagation();
    }

    protected _haveFiles(types:any):any {
        if (!types) {
            return false;
        }

        if (types.indexOf) {
            return types.indexOf('Files') !== -1;
        } else if (types.contains) {
            return types.contains('Files');
        } else {
            return false;
        }
    }
}
