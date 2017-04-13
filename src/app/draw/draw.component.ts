import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventBusService } from '../event-bus.service';
import { Model } from '../model';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit, OnDestroy {
    model: Model = null;
    constructor(private eventBusService: EventBusService) { 
        eventBusService.getMessage().subscribe((item: Model) => {
            this.model = item;
            console.log(item)
        });
    }

    ngOnInit() {
    
    }

    ngOnDestroy() {

    }

}
