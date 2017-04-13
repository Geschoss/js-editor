import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ImportComponent } from './import/import.component';
import { DrawComponent } from './draw/draw.component';
import { EventBusService } from './event-bus.service';

@NgModule({
  declarations: [
    AppComponent,
    ImportComponent,
    DrawComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    EventBusService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
