import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ForexSingleUnitComponent, SplitPairPipe, FixedDecimalPipe } from './forex-single-unit/forex-single-unit.component';
import { ForexGridComponent } from './forex-grid/forex-grid.component';
import { ForexTableComponent } from './forex-table/forex-table.component';
import { ForexMultiComponent } from './forex-multi/forex-multi.component';
import { ForexHomeComponent } from './forex-home/forex-home.component';
import { ForexCompareComponent } from './forex-compare/forex-compare.component';

@NgModule({
  declarations: [
    AppComponent,
    ForexSingleUnitComponent, SplitPairPipe, FixedDecimalPipe, ForexGridComponent, ForexTableComponent, ForexMultiComponent, ForexHomeComponent, ForexCompareComponent
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
