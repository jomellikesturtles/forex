import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import * as supported_pairs from '../supported_pairs.json'
import { ForexService } from '../forex.service';
import { forex_api_res, exchange } from '../forex-unit/forex-unit.component';
import { ForexMultiComponent } from '../forex-multi/forex-multi.component';

@Component({
  selector: 'app-forex-table',
  templateUrl: './forex-table.component.html',
  styleUrls: ['./forex-table.component.scss']
})
export class ForexTableComponent extends ForexMultiComponent implements OnInit {

  @Output() childUpdateTime = new EventEmitter<any>()
  exchangeList = []
  errorCallbackMessage = ''
  procLoading = false

  constructor(private forexService: ForexService, private cdr: ChangeDetectorRef) { super() }

  ngOnInit(): void {
    this.getAllValues()
  }

  getAllValues() {

    this.procLoading = true
    const pairListStr = supported_pairs.supportedPairs.join(',')
    this.forexService.getPairsValues(pairListStr).subscribe((e: forex_api_res) => {
      console.log('e')
      if (e.code === 200) {
        this.setFirstValues(e)
        setInterval(() => {
          this.procLoading = true
          this.getPairValues(e)
        }, 20000)
      } else { // error
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
    console.log('setting first vvalues: ', e)
    Object.entries(e.rates).forEach(rate => {
      const myObj = super.getRateValue(rate)
      this.exchangeList.push(myObj)
    })
    this.childUpdateTime.emit(this.exchangeList[0]['timestamp'])
    // this.procLoading = false
  }

  getPairValues(e) {
    // this.exchangeList = []
    console.log('new vals ', e)
    // this.currentTime = new Date(e.rates[0][1]['timestamp'])
    Object.entries(e.rates).forEach(rate => {
      // this.exchangeList.find(exUnit => exUnit.name = rate[0])
      this.exchangeList.forEach(exUnit => {
        if (exUnit.name === rate[0]) {
          const myObj = super.getRateValue(rate)
          exUnit = myObj
          return
        }
      })
    })
    this.childUpdateTime.emit(this.exchangeList[0]['timestamp'])
  }

}
