import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { SidebarToggleService } from './services/sidebar-toggle.service';
import { JsonCntService } from './services/json-cnt.service';


import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { SidebarBtnComponent } from './sidebar-btn/sidebar-btn.component';
import { CardViewComponent } from './card-view/card-view.component';
import { CardItemComponent } from './card-item/card-item.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ContentComponent,
    SidebarBtnComponent,
    CardViewComponent,
    CardItemComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    SidebarToggleService,
    JsonCntService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
