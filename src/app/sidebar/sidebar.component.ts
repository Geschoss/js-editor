import { Component} from '@angular/core';
import { Observable } from 'rxjs';

import { LayoutService } from '../services/layout.service';
import { JsonConverterService } from '../services/json-converter.service';
import { DbService } from '../services/db.service';
import { Model, TextModel } from '../model';

//hard code
const MODEL = {
  "background": {
    "backgroundUrl": "https://cdnb.artstation.com/p/assets/images/images/000/161/865/large/tuomas-korpi-beachbar-04.jpg?1443930719"
  },
  "content": [
    {
      "text": "ООО \"Парадайз\"",
      "x": 782,
      "y": 137,
      "size": 54,
      "color": "#ed3939",
      "font": "arial, verdana, sans-serif"
    },
    {
      "text": "Добро пожаловать!",
      "x": 1,
      "y": -49,
      "size": 143,
      "color": "#1c27ec",
      "font": "arial, verdana, sans-serif"
    },
    {
      "text": "бесплатный завтрак*",
      "size": 40,
      "color": "#f10000",
      "font": "arial",
      "x": 9,
      "y": 227
    },
    {
      "text": "*без кофе",
      "size": 40,
      "color": "#00ed36",
      "font": "arial",
      "x": 21,
      "y": 702
    },
    {
      "text": "телефон",
      "size": 40,
      "color": "#000000",
      "font": "arial",
      "x": 821,
      "y": 704
    }
  ]
};
//hard code


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {
    private accept: string = ".json";
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
                        { background: latestValues[0]},
                        { content: latestValues[1]}
                    ),
                    undefined, 2);
        });

        //hard code
        this.convertAndSave(JSON.stringify(MODEL, undefined, 2));
        //hard code
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
