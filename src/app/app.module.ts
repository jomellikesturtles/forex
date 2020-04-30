import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForexUnitComponent } from './forex-unit/forex-unit.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ForexSingleUnitComponent, SplitPairPipe, FixedDecimalPipe } from './forex-single-unit/forex-single-unit.component';
import { Utils } from './Utils';
import { ForexGridComponent } from './forex-grid/forex-grid.component';
import { ForexTableComponent } from './forex-table/forex-table.component';
import { ForexMultiComponent } from './forex-multi/forex-multi.component';

@NgModule({
  declarations: [
    AppComponent,
    ForexUnitComponent,
    ForexSingleUnitComponent, SplitPairPipe, FixedDecimalPipe, ForexGridComponent, ForexTableComponent, ForexMultiComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
