import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalesComponent } from './sales/sales.component';
import { RecomendationsComponent } from './recomendations/recomendations.component';

@NgModule({
  declarations: [
    AppComponent,
    SalesComponent,
    RecomendationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
