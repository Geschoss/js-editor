import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdInputModule} from '@angular/material';

import { AppComponent } from './app.component';

import { SidebarToggleService } from './services/sidebar-toggle.service';
import { JsonConverterService } from './services/json-converter.service';
import { DbService } from './services/db.service';


import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { CardViewComponent } from './card-view/card-view.component';
import { CardItemComponent } from './card-item/card-item.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { DropzoneDirective } from './dropzone.directive';
import { DraggableDirective } from './draggable.directive';
import { EditItemComponent } from './edit-item/edit-item.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ContentComponent,
    CardViewComponent,
    CardItemComponent,
    UploadFileComponent,
    DropzoneDirective,
    DraggableDirective,
    EditItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MdInputModule
  ],
  providers: [
    SidebarToggleService,
    JsonConverterService,
    DbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
