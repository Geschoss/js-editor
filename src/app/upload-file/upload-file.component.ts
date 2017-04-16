import { Component, OnInit, Output, Input, EventEmitter, ViewChild, AfterViewInit,OnDestroy } from "@angular/core";
import { DropzoneDirective } from '../dropzone.directive';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() accept: string = "";
    @ViewChild(DropzoneDirective) dropzone: DropzoneDirective;
    @ViewChild('hiddenInput') hiddenInput;
    @Output() onUpload: EventEmitter<File[]> = new EventEmitter();
    isDragover:boolean = false;

    // Subscription
    fileOver$: Subscription;
    onFileDrop$: Subscription;

    constructor() {}

    ngOnInit() {}

    ngAfterViewInit() {
        let isFileOver = (isOver) => this.isDragover = isOver ;
        let isFileDrop = (fileList) => {
            this.emitFileImport(this.getFiles(fileList));
        };

        this.fileOver$ = this.dropzone.fileOver
            .subscribe(isFileOver);
            
        this.onFileDrop$ = this.dropzone.onFileDrop
            .subscribe(isFileDrop);
    }

    ngOnDestroy() {
        this.fileOver$.unsubscribe();
        this.onFileDrop$.unsubscribe();
    }

    fileChange(event: any) {
        this.emitFileImport(this.getFiles(event.target.files));
    }

    emitFileImport(files: File[]) {
        this.hiddenInput.nativeElement.value = "";
        this.onUpload.emit(files);
    }

    getFiles(fileList: any) {
        let length = fileList.length;
        if(length < 1) {
            return [];
        };
        let eventFile = [];
        for(let i = 0; i < length; i++){
            eventFile.push(fileList[i]);
        }
        return eventFile;
    }

    
}
