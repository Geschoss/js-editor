import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';

import { LayoutService } from '../services/layout.service';
import { JsonConverterService } from '../services/json-converter.service';
import { DbService } from '../services/db.service';
import { Model, TextModel } from '../model';

const MODEL = {
  "backgroundUrl": "https://cdnb.artstation.com/p/assets/images/images/000/161/865/large/tuomas-korpi-beachbar-04.jpg?1443930719",
  "x-size": 1000,
  "y-size": 500,
  "content": [
    {
      "text": "first",
      "x": 100,
      "y": 59,
      "size": 54,
      "color": "red",
      "font": "arial, verdana, sans-serif"
    },
    {
      "text": "second",
      "x": 200,
      "y": 209,
      "size": 154,
      "color": "white",
      "font": "arial, verdana, sans-serif"
    }
  ]
};



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  	private isOpen$: Observable<boolean>;
    private model$: Observable<string>;
    private invalid: boolean = false;
  	constructor(private layoutService: LayoutService,
                  private jsonConverterService: JsonConverterService,
                  private dbService: DbService) {
  		this.isOpen$ = layoutService.getIsSidebarOpen();


        this.model$ = Observable
        .combineLatest(dbService.getCardModel(),dbService.getTextModels())
        .debounceTime(200)
        .map(latestValues => {
            return JSON.stringify( // TODO сделать лаконичкие
                    Object.assign(
                        {},
                        latestValues[0],
                        { content: latestValues[1]}
                    ),
                    undefined, 2);
        });

        //hard code
        this.convertAndSave(JSON.stringify(MODEL, undefined, 2));
        //hard code
  	}

  	ngOnInit() {

  	}

  	ngAfterViewInit() {

  	}

    onKey(value: string) {
        this.invalid = this.convertAndSave(value);
    }

    fileWasUpload(files: any) {
        var reader:FileReader = new FileReader();
        reader.onloadend = (evt: any) => {
            this.invalid = this.convertAndSave(reader.result);
        };
        reader.readAsBinaryString(files[0]);
    }

    convertAndSave(value: string){
        if(value){
            let model = this.jsonConverterService.convertToJSON(value);
            if(model){
                this.dbService.setModel(model);
                return false;
            }
        }
        return true;
    }

}
