import { Component, OnInit,ViewChild, AfterViewInit, } from '@angular/core';
import { EventBusService } from '../event-bus.service';
import { Model } from '../model';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit, AfterViewInit {
    private valid: boolean = false;
    json = `{ "backgroundUrl": "http://cdn.tvc.ru/pictures/o/212/760.jpg", 
            "x-size": "500",
            "y-size": "500",
            "content": []
        }`
    @ViewChild('textarea') hiddenInput;

    constructor(private eventBusService: EventBusService) { }

    ngOnInit() {
    
    }

    ngAfterViewInit() {
        this.hiddenInput.nativeElement.value = this.json;
    }

    onKey(value: string) {
        let result: Model;
        try{
            result = <Model>JSON.parse(value);
            this.valid = true;
            this.eventBusService.sendMessage(result);
        }catch(err) {
            console.log(result);
            this.valid = false;
        }
    }
}
