import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { ForexService } from '../forex.service';
import { pipe } from 'rxjs';
import * as supported_pairs from '../supported_pairs.json'
import * as iso_4217 from '../iso_4217.json'
import { Utils } from '../Utils'
import { forex_api_res } from '../interfaces';
import { ForexMultiComponent } from '../forex-multi/forex-multi.component';

@Component({
  selector: 'app-forex-grid',
  templateUrl: './forex-grid.component.html',
  styleUrls: ['./forex-grid.component.scss']
})
export class ForexGridComponent extends ForexMultiComponent implements OnInit {

  @Output() childUpdateTime = new EventEmitter<any>()

  exchangeList = []
  procLoading = false
  errorCallbackMessage

  constructor(private forexService: ForexService, private cdr: ChangeDetectorRef) {
    super()
  }

  ngOnInit(): void {
    this.getAllValues()
  }

  getAllValues() {
    this.procLoading = true
    const pairListStr = supported_pairs.supportedPairs.join(',')
    this.forexService.getPairsValues(pairListStr).subscribe((e: forex_api_res) => {
      console.log('e', e)
      if (e.code === 200) {
        this.setFirstValues(e)
        setInterval(() => {
          this.procLoading = true
          this.getPairValues(e)
        }, 20000)
      } else {
        this.errorCallbackMessage = e['message']
        this.exchangeList = super.getOfflineData()
        this.childUpdateTime.emit(this.exchangeList[0]['timestamp'])
        this.cdr.detectChanges()
      }
    }, (error) => {
      console.log('inerror')
      this.errorCallbackMessage = error.message
    }, () => {
      this.procLoading = false
    })
  }

  setFirstValues(e) {
    console.log(e)
    Object.entries(e.rates).forEach(rate => {
      this.exchangeList.push(super.getRateValue(rate))
    })
    this.childUpdateTime.emit(this.exchangeList[0]['timestamp'])
    this.cdr.detectChanges()
    this.procLoading = false
  }

  getPairValues(e) {
    this.exchangeList = []
    console.log(e)
    Object.entries(e.rates).forEach(rate => {
      this.exchangeList.forEach(exUnit => {
        if (exUnit.name === rate[0]) {
          exUnit = super.getRateValue(rate)
          return
        }
      })
    })
    this.childUpdateTime.emit(this.exchangeList[0]['timestamp'])
  }

}
