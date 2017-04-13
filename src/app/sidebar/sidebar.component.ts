import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SidebarToggleService } from '../services/sidebar-toggle.service';
import { JsonCntService } from '../services/json-cnt.service';
import { Model, TextObj } from '../model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {
    private initJson: String = '';
  	private isOpen$: Observable<boolean>;
    private invalid: boolean = false;
  	constructor(private sidebarToggleService: SidebarToggleService,
                  private jsonCntService: JsonCntService) {
  		this.isOpen$ = sidebarToggleService.getIsOpen();

      jsonCntService.getModel()
      .skip(1)
      .subscribe((item)=> this.initJson = JSON.stringify(item, undefined, 2));
  	}

  	ngOnInit() {

  	}

  	ngAfterViewInit() {

  	}

    onKey(value: string) {
        this.invalid = value === ''? false : this.jsonCntService.setModel(value);
    }

    fileImport(event: any) {
        console.log(event.target.value);
        console.log(event.target.files);
        var reader:FileReader = new FileReader();

        reader.onloadend = (evt: any) => {
            this.invalid = reader.result === ''? false : this.jsonCntService.setModel(reader.result);
        };
        reader.readAsBinaryString(event.target.files[0]);
    }

}
