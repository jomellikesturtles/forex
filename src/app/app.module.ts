import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForexUnitComponent } from './forex-unit/forex-unit.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ForexSingleUnitComponent, SplitPairPipe, FixedDecimalPipe } from './forex-single-unit/forex-single-unit.component';

@NgModule({
  declarations: [
    AppComponent,
    ForexUnitComponent,
    ForexSingleUnitComponent, SplitPairPipe, FixedDecimalPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
